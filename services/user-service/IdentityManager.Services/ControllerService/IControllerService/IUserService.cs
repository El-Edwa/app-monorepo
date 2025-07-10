using Models.DTOs.image;
using Models.DTOs.User;
using System.Threading.Tasks;

namespace IdentityManager.Services.ControllerService.IControllerService
{
    /// <summary>
    /// Interface for user-related operations in the application layer
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Uploads and assigns a profile image to a user
        /// </summary>
        Task<object> UploadUserImageAsync(string userId, ImageUploadRequestDto request);
        
        /// <summary>
        /// Uploads and assigns a background image to a user
        /// </summary>
        Task<object> UploadBackgroundImageAsync(string userId, BackgroundImageUploadRequestDto request);
        
        /// <summary>
        /// Gets a user's profile
        /// </summary>
        Task<UserProfileDTO> GetUserProfileAsync(string userId);
        
        /// <summary>
        /// Updates a user's profile information
        /// </summary>
        Task<UserProfileDTO> UpdateUserProfileAsync(string userId, ProfileUpdateDTO profileUpdate);
        
        /// <summary>
        /// Deactivates a user's account
        /// </summary>
        Task<bool> DeactivateUserAsync(string userId);
    }
}
