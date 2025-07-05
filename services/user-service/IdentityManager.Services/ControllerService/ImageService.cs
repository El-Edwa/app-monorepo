using IdentityManager.Services.ControllerService.IControllerService;
using IdentityManager.Services.Infrastructure.Interfaces;
using DataAcess.Repos.IRepos;
using Microsoft.AspNetCore.Http;
using Models.Domain;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityManager.Services.ControllerService
{
    /// <summary>
    /// Service implementation for image-related operations
    /// Coordinates between repository and infrastructure services
    /// </summary>
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;
        private readonly IFileStorageService _fileStorageService;

        public ImageService(
            IImageRepository imageRepository,
            IFileStorageService fileStorageService)
        {
            _imageRepository = imageRepository;
            _fileStorageService = fileStorageService;
        }

        public async Task<Image> UploadImageAsync(IFormFile file, string baseName = null)
        {
            // Validate the file
            ValidateImageFile(file);

            // Save the file to storage
            var (fileName, filePath) = await _fileStorageService.SaveFileAsync(file, baseName);

            // Create the image entity
            var image = new Image
            {
                FileName = fileName,
                FileExtension = Path.GetExtension(file.FileName),
                FileSize = file.Length,
                FilePath = filePath
            };

            // Save to database
            return await _imageRepository.CreateAsync(image);
        }

        public void ValidateImageFile(IFormFile file)
        {
            if (file == null)
            {
                throw new ArgumentException("File is required");
            }
            
            if (file.Length == 0)
            {
                throw new ArgumentException("File is empty");
            }
            
            if (file.Length > 10 * 1024 * 1024)
            {
                throw new ArgumentException("File is too large (max 10MB)");
            }
            
            var allowedContentTypes = new[] { "image/jpeg", "image/png", "image/jpg" };
            if (!allowedContentTypes.Contains(file.ContentType))
            {
                throw new ArgumentException($"File must be a JPEG or PNG image. Current content type: {file.ContentType}");
            }
        }

        public async Task<bool> DeleteImageAsync(int imageId)
        {
            // Get the image first
            var image = await _imageRepository.GetByIdAsync(imageId);
            if (image == null)
            {
                return false;
            }

            // Delete from storage
            string fileName = Path.GetFileName(image.FilePath);
            await _fileStorageService.DeleteFileAsync(fileName);

            // Delete from database
            return await _imageRepository.DeleteAsync(imageId);
        }
    }
}