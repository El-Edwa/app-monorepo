using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models.DTOs.Auth;
using Models.DTOs.User;
using Models;
using System.Net;
using DataAcess.Repos.IRepos;
using Models.Domain;
using IdentityManager.Services.ControllerService.IControllerService;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;

namespace IdentityManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProblemDetails))]
    public class AuthUserController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthUserController(IAuthService authService)
        {
            _authService = authService;
        }
        
        /// <summary>
        /// Authenticates a user and returns an access token
        /// </summary>
        /// <param name="loginRequestDTO">Username and password</param>
        /// <returns>JWT token and user info on success</returns>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LoginResponseDTO))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ProblemDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequestDTO)
        {
            try
            {
                var result = await _authService.LoginAsync(loginRequestDTO) as LoginResponseDTO;

                if (result == null || string.IsNullOrEmpty(result.Token))
                {
                    return Unauthorized(new ProblemDetails
                    {
                        Title = "Authentication Failed",
                        Detail = "Invalid username or password",
                        Status = StatusCodes.Status401Unauthorized
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Login Failed",
                    Detail = ex.Message,
                    Status = StatusCodes.Status400BadRequest
                });
            }
        }
        
        /// <summary>
        /// Registers a new user
        /// </summary>
        /// <param name="registerRequestDTO">User registration information</param>
        /// <returns>User information on success</returns>
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(UserDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
        [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerRequestDTO)
        {
            try
            {
                var result = await _authService.RegisterAsync(registerRequestDTO);
                
                // If result is UserDTO with errors
                if (result is UserDTO userDTO && userDTO.ErrorMessages.Any())
                {
                    return BadRequest(new ProblemDetails
                    {
                        Title = "Registration Failed",
                        Detail = string.Join(", ", userDTO.ErrorMessages),
                        Status = StatusCodes.Status400BadRequest
                    });
                }
                
                // Created: 201 is more appropriate for resource creation
                return CreatedAtAction(nameof(Register), result);
            }
            catch (ValidationException ex)
            {
                // 409 Conflict is appropriate for existing email/username
                return Conflict(new ProblemDetails
                {
                    Title = "Registration Failed",
                    Detail = ex.Message,
                    Status = StatusCodes.Status409Conflict
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Registration Failed",
                    Detail = ex.Message,
                    Status = StatusCodes.Status400BadRequest
                });
            }
        }

        /// <summary>
        /// Refreshes an access token using a refresh token
        /// </summary>
        /// <param name="request">Refresh token</param>
        /// <returns>New access and refresh tokens</returns>
        [HttpPost("refresh-token")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LoginResponseDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRefreshRequestDTO request)
        {
            try
            {
                var result = await _authService.RefreshTokenAsync(request);
                return Ok(result);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Invalid Request",
                    Detail = ex.Message,
                    Status = StatusCodes.Status400BadRequest
                });
            }
            catch (InvalidOperationException ex)
            {
                return Unauthorized(new ProblemDetails
                {
                    Title = "Token Refresh Failed",
                    Detail = ex.Message,
                    Status = StatusCodes.Status401Unauthorized
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Token Refresh Failed",
                    Detail = ex.Message,
                    Status = StatusCodes.Status400BadRequest
                });
            }
        }

        /// <summary>
        /// Revokes a refresh token
        /// </summary>
        /// <param name="request">Refresh token to revoke</param>
        /// <returns>Success status</returns>
        [HttpPost("revoke-token")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> RevokeToken([FromBody] TokenRefreshRequestDTO request)
        {
            try
            {
                var result = await _authService.RevokeRefreshTokenAsync(request);
                
                // If result contains a Success property that's false, token wasn't found
                if (result.GetType().GetProperty("Success")?.GetValue(result) is bool success && !success)
                {
                    return NotFound(new ProblemDetails
                    {
                        Title = "Token Revocation Failed",
                        Detail = "The specified refresh token was not found or is already expired",
                        Status = StatusCodes.Status404NotFound
                    });
                }
                
                return Ok(result);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Invalid Request",
                    Detail = ex.Message,
                    Status = StatusCodes.Status400BadRequest
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Token Revocation Failed",
                    Detail = ex.Message,
                    Status = StatusCodes.Status400BadRequest
                });
            }
        }
    }
}
