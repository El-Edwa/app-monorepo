using Models.DTOs.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdentityManager.Services.ControllerService.IControllerService
{
    public interface IAuthService
    {
        Task<object> LoginAsync(LoginRequestDTO loginRequestDTO);
        Task<object> RegisterAsync(RegisterRequestDTO registerRequestDTO);
        Task<object> RefreshTokenAsync(TokenRefreshRequestDTO tokenRefreshRequestDTO);
        Task<object> RevokeRefreshTokenAsync(TokenRefreshRequestDTO tokenRefreshRequestDTO);
    }
}
