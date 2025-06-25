using DataAcess.Repos.IRepos;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models.DTOs.Auth;
using Models.DTOs.User;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models.Domain;


namespace DataAcess.Repos
{
    public class UserRepository : Repository<ApplicationUser>, IUserRepository
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        private string securityKey;

        public UserRepository(ApplicationDbContext db, IConfiguration configuration, UserManager<ApplicationUser> userManager, IMapper mapper, RoleManager<IdentityRole> roleManager) : base(db)
        {
            this.db = db;
            this.configuration = configuration;
            this.userManager = userManager;
            this.mapper = mapper;
            this.roleManager = roleManager;
            //Just install `Microsoft.Extensions.Configuration.Binder` and the method `GetValue` will be available
            securityKey = configuration.GetValue<string>("ApiSettings:Secret") ?? throw new InvalidOperationException("ApiSettings:Secret is not configured.");
        }

        public async Task<ApplicationUser> GetUserByID(string userID)
        {
            var user = await db.ApplicationUser
                .Include(u => u.Image)
                .Include(u => u.BackgroundImage)
                .FirstOrDefaultAsync(u => u.Id == userID);
            
            return user ?? throw new InvalidOperationException("User not found.");
        }

        public async Task<bool> IsUniqueUserName(string username)
        {
            var matchUsername = await userManager.FindByNameAsync(username);
            return matchUsername == null;
        }

        public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO)
        {
            var user = await userManager.FindByNameAsync(loginRequestDTO.UserName);
            if (user == null || !await userManager.CheckPasswordAsync(user, loginRequestDTO.Password))
            {
                return new LoginResponseDTO()
                {
                    Token = "",
                    User = null,
                };
            }
            
            // Load the user with related image data
            user = await db.ApplicationUser
                .Include(u => u.Image)
                .FirstOrDefaultAsync(u => u.Id == user.Id);
            
            // Generate JWT token
            var accessToken = await GenerateJwtToken(user);
            
            // Create refresh token
            var refreshToken = await CreateRefreshToken(user.Id);
            
            // Get token expiration
            var tokenExpiration = DateTime.UtcNow.AddMinutes(15); // Same as in GenerateJwtToken

            return new LoginResponseDTO()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(accessToken),
                User = mapper.Map<UserDTO>(user),
                RefreshToken = refreshToken.Token,
                RefreshTokenExpiration = refreshToken.Expires,
                TokenExpiration = tokenExpiration
            };
        }

        private async Task<JwtSecurityToken> GenerateJwtToken(ApplicationUser user)
        {
            var userRoles = await userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };
            claims.AddRange(userRoles.Select(r => new Claim(ClaimTypes.Role, r)));

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(securityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Shorter expiration time for access tokens (e.g., 15 minutes)
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: creds);

            return token;
        }

        public async Task<RefreshToken> CreateRefreshToken(string userId)
        {
            // Revoke any existing active refresh tokens for this user
            var activeTokens = await db.RefreshTokens
                .Where(rt => rt.UserId == userId && rt.Revoked == null && rt.Expires > DateTime.UtcNow)
                .ToListAsync();
            
            foreach (var token in activeTokens)
            {
                token.Revoked = DateTime.UtcNow;
            }

            // Generate new refresh token
            var randomBytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            
            var refreshToken = new RefreshToken
            {
                UserId = userId,
                Token = Convert.ToBase64String(randomBytes),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow
            };

            await db.RefreshTokens.AddAsync(refreshToken);
            await db.SaveChangesAsync();

            return refreshToken;
        }

        public async Task<LoginResponseDTO> RefreshToken(string refreshToken)
        {
            var storedToken = await db.RefreshTokens
                .Include(rt => rt.User)
                .ThenInclude(u => u.Image)
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (storedToken == null)
                throw new InvalidOperationException("Invalid refresh token");

            // Check if token is active manually instead of using the IsActive property
            if (storedToken.Revoked != null || storedToken.Expires <= DateTime.UtcNow)
                throw new InvalidOperationException("Refresh token is expired or revoked");

            // User from the refresh token
            var user = storedToken.User;

            // Generate a new access token - ensure this is creating a completely new token
            var newAccessToken = await GenerateJwtToken(user);
            var newAccessTokenString = new JwtSecurityTokenHandler().WriteToken(newAccessToken);

            // Generate a new refresh token and revoke the current one
            storedToken.Revoked = DateTime.UtcNow;
            var newRefreshToken = await CreateRefreshToken(user.Id);

            await db.SaveChangesAsync();
            
            // Get token expiration
            var tokenExpiration = DateTime.UtcNow.AddMinutes(15); // Same as in GenerateJwtToken

            return new LoginResponseDTO
            {
                Token = newAccessTokenString,
                User = mapper.Map<UserDTO>(user),
                RefreshToken = newRefreshToken.Token,
                RefreshTokenExpiration = newRefreshToken.Expires,
                TokenExpiration = tokenExpiration
            };
        }

        public async Task<bool> RevokeRefreshToken(string refreshToken)
        {
            var storedToken = await db.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == refreshToken);
            
            // Check if token exists and is active manually
            if (storedToken == null || storedToken.Revoked != null || storedToken.Expires <= DateTime.UtcNow)
                return false;

            storedToken.Revoked = DateTime.UtcNow;
            await db.SaveChangesAsync();
            
            return true;
        }

        public async Task<UserDTO> Register(RegisterRequestDTO registerRequestDTO)
        {
            var user = new ApplicationUser
            {
                UserName = registerRequestDTO.UserName,
                Name = registerRequestDTO.Name,
                Email = registerRequestDTO.Email,
                NormalizedEmail = registerRequestDTO.Email.ToUpper(),
                CreatedDate = DateTime.UtcNow // Explicitly set CreatedDate during registration
            };

            var userDTO = new UserDTO();

            try
            {
                var result = await userManager.CreateAsync(user, registerRequestDTO.Password);
                if (result.Succeeded)
                {
                    if (registerRequestDTO.Roles != null && registerRequestDTO.Roles.Any())
                    {
                        foreach (var role in registerRequestDTO.Roles)
                        {
                            if (!await roleManager.RoleExistsAsync(role))
                            {
                                await roleManager.CreateAsync(new IdentityRole(role));
                            }
                            await userManager.AddToRoleAsync(user, role);
                        }   
                    }

                    userDTO = mapper.Map<UserDTO>(user);
                }
                else
                {
                    userDTO.ErrorMessages = result.Errors.Select(e => e.Description).ToList();
                }
            }
            catch (Exception)
            {
                userDTO.ErrorMessages = new List<string> { "An unexpected error occurred while registering the user." };
            }

            return userDTO;
        }

        public async Task<bool> UpdateAsync(ApplicationUser user)
        {
            var existingUser = await db.ApplicationUser.FindAsync(user.Id);
            if (existingUser == null)
            {
                return false;
            }

            // Update profile image
            if (user.ImageId.HasValue)
            {
                existingUser.ImageId = user.ImageId;
            }
            
            // Update background image if it's present in the model
            if (user.BackgroundImageId.HasValue)
            {
                existingUser.BackgroundImageId = user.BackgroundImageId;
            }
            
            // Update other profile fields
            if (user.Name != null)
            {
                existingUser.Name = user.Name;
            }
            
            if (user.Bio != null)
            {
                existingUser.Bio = user.Bio;
            }
            
            if (user.Location != null)
            {
                existingUser.Location = user.Location;
            }
            
            if (user.WebsiteUrl != null)
            {
                existingUser.WebsiteUrl = user.WebsiteUrl;
            }
            
            // Update active status
            existingUser.IsActive = user.IsActive;
            
            // IMPORTANT: Do NOT update CreatedDate - we preserve this value
            // from registration only

            var result = await db.SaveChangesAsync();
            return result > 0;
        }
    }
}