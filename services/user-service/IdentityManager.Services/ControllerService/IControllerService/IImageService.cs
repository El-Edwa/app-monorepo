using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Models.Domain;
using Models.DTOs.image;

namespace IdentityManager.Services.ControllerService.IControllerService
{
    /// <summary>
    /// Interface for image-related operations in the application layer
    /// </summary>
    public interface IImageService
    {
        /// <summary>
        /// Uploads and creates an image, handling both storage and database operations
        /// </summary>
        Task<Image> UploadImageAsync(IFormFile file, string baseName = null);
        
        /// <summary>
        /// Validates that the uploaded file meets requirements
        /// </summary>
        void ValidateImageFile(IFormFile file);
        
        /// <summary>
        /// Deletes an image, handling both storage and database operations
        /// </summary>
        Task<bool> DeleteImageAsync(int imageId);
    }
}