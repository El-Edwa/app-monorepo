using DataAcess.Repos.IRepos;
using IdentityManager.Services.ControllerService.IControllerService;
using Models.DTOs.Auth;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdentityManager.Services.ControllerService
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<object> LoginAsync(LoginRequestDTO loginRequestDTO)
        {
            return await _userRepository.Login(loginRequestDTO);
        }

        public async Task<object> RefreshTokenAsync(TokenRefreshRequestDTO tokenRefreshRequestDTO)
        {
            if (string.IsNullOrEmpty(tokenRefreshRequestDTO.RefreshToken))
            {
                throw new ValidationException("Refresh token is required");
            }

            return await _userRepository.RefreshToken(tokenRefreshRequestDTO.RefreshToken);
        }

        public async Task<object> RegisterAsync(RegisterRequestDTO registerRequestDTO)
        {
            var emailExist = await _userRepository.GetAsync(user => user.Email == registerRequestDTO.Email);
            if (emailExist != null)
            {
                throw new ValidationException("Email Already exists");
            }

            return await _userRepository.Register(registerRequestDTO);
        }

        public async Task<object> RevokeRefreshTokenAsync(TokenRefreshRequestDTO tokenRefreshRequestDTO)
        {
            if (string.IsNullOrEmpty(tokenRefreshRequestDTO.RefreshToken))
            {
                throw new ValidationException("Refresh token is required");
            }

            var result = await _userRepository.RevokeRefreshToken(tokenRefreshRequestDTO.RefreshToken);
            return new { Success = result };
        }
    }
}
