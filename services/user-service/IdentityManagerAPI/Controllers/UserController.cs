using DataAcess.Repos.IRepos;
using IdentityManager.Services.ControllerService.IControllerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Domain;
using Models.DTOs.image;
using System.Security.Claims;

namespace IdentityManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [Authorize]
        [Route("uploadUserImage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadUserImage([FromForm] ImageUploadRequestDto request)
        {
            try
            {
                if (request == null || request.File == null)
                {
                    return BadRequest("Image file is required");
                }
                
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User identity not found");
                }
                
                var result = await userService.UploadUserImageAsync(userId, request);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception here if you have a logging framework
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    new { error = "An error occurred while uploading the image", details = ex.Message });
            }
        }
    }
}
