using AutoMapper;
using DataAcess.Repos.IRepos;
using IdentityManager.Services.ControllerService.IControllerService;
using Models.Domain;
using Models.DTOs.image;
using Models.DTOs.User;
using System;
using System.Threading.Tasks;

namespace IdentityManager.Services.ControllerService
{
    /// <summary>
    /// Service implementation for user-related operations
    /// Coordinates between repositories and other services
    /// </summary>
    public class UserService : IUserService
    {
        private readonly IImageService _imageService;
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UserService(
            IImageService imageService,
            IUserRepository userRepo,
            IMapper mapper)
        {
            _imageService = imageService;
            _userRepo = userRepo;
            _mapper = mapper;
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

                // Use the image service to handle image upload
                var uploadedImage = await _imageService.UploadImageAsync(request.File);
                
                // Create a user update object that only includes the property we want to update
                var userToUpdate = new ApplicationUser
                {
                    Id = user.Id,
                    ImageId = uploadedImage.Id,
                    // Don't set CreatedDate here
                };
                
                var updateResult = await _userRepo.UpdateAsync(userToUpdate);
                
                if (!updateResult)
                {
                    throw new Exception("Failed to update user with the new image");
                }

                // Reload the user to get the updated data
                user = await _userRepo.GetUserByID(userId);
                
                return new { 
                    Message = "Profile image uploaded successfully", 
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
                throw;
            }
        }
        
        public async Task<object> UploadBackgroundImageAsync(string userId, BackgroundImageUploadRequestDto request)
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

                // Use the image service with a specific base name for background images
                var uploadedImage = await _imageService.UploadImageAsync(request.File, $"bg_{DateTime.Now.ToString("yyyyMMddHHmmssfff")}");
                
                // Create a user update object that only includes the property we want to update
                var userToUpdate = new ApplicationUser
                {
                    Id = user.Id,
                    BackgroundImageId = uploadedImage.Id,
                    // Don't set CreatedDate here
                };
                
                var updateResult = await _userRepo.UpdateAsync(userToUpdate);
                
                if (!updateResult)
                {
                    throw new Exception("Failed to update user with the new background image");
                }

                // Reload the user to get the updated data
                user = await _userRepo.GetUserByID(userId);
                
                return new { 
                    Message = "Background image uploaded successfully", 
                    ImagePath = uploadedImage.FilePath,
                    ImageId = uploadedImage.Id,
                    User = new
                    {
                        Id = user.Id,
                        Name = user.Name,
                        UserName = user.UserName,
                        BackgroundImageId = user.BackgroundImageId
                    }
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UserService.UploadBackgroundImageAsync: {ex.Message}");
                throw;
            }
        }
        
        public async Task<UserProfileDTO> GetUserProfileAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID is required");
            }

            var user = await _userRepo.GetUserByID(userId);
            if (user == null)
            {
                throw new InvalidOperationException($"User with ID {userId} not found");
            }

            return _mapper.Map<UserProfileDTO>(user);
        }
        
        public async Task<UserProfileDTO> UpdateUserProfileAsync(string userId, ProfileUpdateDTO profileUpdate)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID is required");
            }
            
            if (profileUpdate == null)
            {
                throw new ArgumentException("Profile update data is required");
            }
            
            if (string.IsNullOrWhiteSpace(profileUpdate.Name))
            {
                throw new ArgumentException("Name is required and cannot be null or empty");
            }

            // Get the existing user
            var existingUser = await _userRepo.GetUserByID(userId);
            if (existingUser == null)
            {
                throw new InvalidOperationException($"User with ID {userId} not found");
            }
            
            // Create a user update object that only includes the properties we want to update
            var userToUpdate = new ApplicationUser
            {
                Id = userId,
                Name = profileUpdate.Name,
                Bio = profileUpdate.Bio,
                Location = profileUpdate.Location,
                WebsiteUrl = profileUpdate.WebsiteUrl,
                // Don't set CreatedDate here
            };
            
            // Save changes
            var updateResult = await _userRepo.UpdateAsync(userToUpdate);
            if (!updateResult)
            {
                throw new Exception("Failed to update user profile");
            }
            
            // Get and return the updated user profile
            var updatedUser = await _userRepo.GetUserByID(userId);
            return _mapper.Map<UserProfileDTO>(updatedUser);
        }
        
        public async Task<bool> DeactivateUserAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID is required");
            }

            // Get the user
            var user = await _userRepo.GetUserByID(userId);
            if (user == null)
            {
                throw new InvalidOperationException($"User with ID {userId} not found");
            }
            
            // Create a user update object that only includes the property we want to update
            var userToUpdate = new ApplicationUser
            {
                Id = userId,
                IsActive = false,
                // Don't set CreatedDate here
            };
            
            // Save changes
            return await _userRepo.UpdateAsync(userToUpdate);
        }
    }
}
