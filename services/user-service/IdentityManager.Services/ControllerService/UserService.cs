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
                throw new Exception("User not found");
            }

            var user = await _userRepo.GetUserByID(userId);
            ValidateFileUpload(request);

            var image = new Image
            {
                File = request.File,
                FileName = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                FileExtension = Path.GetExtension(request.File.FileName),
                FileSize = request.File.Length
            };

            await _imageRepo.Upload(image);
            user.ImageId = image.Id;
            await _userRepo.UpdateAsync(user);

            return user;
        }

        private void ValidateFileUpload(ImageUploadRequestDto request)
        {
            if (request.File == null)
            {
                throw new Exception("File is required");
            }
            if (request.File.Length == 0)
            {
                throw new Exception("File is empty");
            }
            if (request.File.Length > 10 * 1024 * 1024)
            {
                throw new Exception("File is too large");
            }
            if (request.File.ContentType != "image/jpeg" && request.File.ContentType != "image/png")
            {
                throw new Exception("File is not an image");
            }
        }
    }
}
