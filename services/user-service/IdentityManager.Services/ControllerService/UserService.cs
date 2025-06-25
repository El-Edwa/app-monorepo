using DataAcess.Repos.IRepos;
using IdentityManager.Services.ControllerService.IControllerService;
using Models.Domain;
using Models.DTOs.image;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdentityManager.Services.ControllerService
{
    public class UserService : IUserService
    {
        private readonly IImageRepository _imageRepo;
        private readonly IUserRepository _userRepo;

        public UserService(IImageRepository imageRepo, IUserRepository userRepo)
        {
            _imageRepo = imageRepo;
            _userRepo = userRepo;
        }

        public async Task<object> UploadUserImageAsync(string userId, ImageUploadRequestDto request)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID is required");
            }

            try
            {
                var user = await _userRepo.GetUserByID(userId);
                if (user == null)
                {
                    throw new ArgumentException($"User with ID {userId} not found");
                }

                ValidateFileUpload(request);

                var image = new Image
                {
                    File = request.File,
                    FileName = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                    FileExtension = Path.GetExtension(request.File.FileName),
                    FileSize = request.File.Length
                };

                Console.WriteLine($"Creating image with filename: {image.FileName}{image.FileExtension}");
                var uploadedImage = await _imageRepo.Upload(image);
                
                Console.WriteLine($"Image uploaded successfully with ID: {uploadedImage.Id}");
                
                // Update the user's image ID
                user.ImageId = uploadedImage.Id;
                var updateResult = await _userRepo.UpdateAsync(user);
                
                if (!updateResult)
                {
                    throw new Exception("Failed to update user with the new image");
                }

                return new { 
                    Message = "Image uploaded successfully", 
                    ImagePath = uploadedImage.FilePath,
                    ImageId = uploadedImage.Id,
                    User = new
                    {
                        Id = user.Id,
                        Name = user.Name,
                        UserName = user.UserName,
                        ImageId = user.ImageId
                    }
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UserService.UploadUserImageAsync: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                
                throw;
            }
        }

        private void ValidateFileUpload(ImageUploadRequestDto request)
        {
            if (request == null)
            {
                throw new ArgumentException("Request cannot be null");
            }
            
            if (request.File == null)
            {
                throw new ArgumentException("File is required");
            }
            
            if (request.File.Length == 0)
            {
                throw new ArgumentException("File is empty");
            }
            
            if (request.File.Length > 10 * 1024 * 1024)
            {
                throw new ArgumentException("File is too large (max 10MB)");
            }
            
            var allowedContentTypes = new[] { "image/jpeg", "image/png", "image/jpg" };
            if (!allowedContentTypes.Contains(request.File.ContentType))
            {
                throw new ArgumentException($"File must be a JPEG or PNG image. Current content type: {request.File.ContentType}");
            }
        }
    }
}
