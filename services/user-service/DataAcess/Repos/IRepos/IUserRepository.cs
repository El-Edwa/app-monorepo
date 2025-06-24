using Models.Domain;
using Models.DTOs.Auth;
using Models.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Repos.IRepos
{
    public interface IUserRepository : IRepository<ApplicationUser>
    {
        Task<bool> IsUniqueUserName(string username);
        Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO);
        Task<UserDTO> Register(RegisterRequestDTO registerRequestDTO);
        Task<ApplicationUser> GetUserByID(string userID);
        Task<bool> UpdateAsync(ApplicationUser user);
        Task<LoginResponseDTO> RefreshToken(string refreshToken);
        Task<RefreshToken> CreateRefreshToken(string userId);
        Task<bool> RevokeRefreshToken(string refreshToken);
    }
}
