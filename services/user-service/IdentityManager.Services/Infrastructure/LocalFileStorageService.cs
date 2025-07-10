using IdentityManager.Services.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace IdentityManager.Services.Infrastructure
{
    /// <summary>
    /// Implementation of file storage service that uses the local file system
    /// </summary>
    public class LocalFileStorageService : IFileStorageService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly string _imagesFolder;

        public LocalFileStorageService(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor contextAccessor)
        {
            _webHostEnvironment = webHostEnvironment;
            _contextAccessor = contextAccessor;
            _imagesFolder = "Images";
        }

        public async Task<(string fileName, string filePath)> SaveFileAsync(IFormFile file, string baseName = null)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("Uploaded file is empty or null.");
            }

            // Create the Images directory if it doesn't exist
            var folderPath = Path.Combine(_webHostEnvironment.ContentRootPath, _imagesFolder);
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            // Generate a unique filename
            var fileName = string.IsNullOrEmpty(baseName) 
                ? DateTime.Now.ToString("yyyyMMddHHmmssfff") 
                : baseName;
            var fileExtension = Path.GetExtension(file.FileName);
            var uniqueFileName = EnsureUniqueFileName(folderPath, fileName, fileExtension);

            var localFilepath = Path.Combine(folderPath, $"{uniqueFileName}{fileExtension}");

            // Save the file to disk
            using (var fileStream = new FileStream(localFilepath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            // Build the URL for accessing the image
            var urlFilepath = GetFileUrl($"{uniqueFileName}{fileExtension}");

            return (uniqueFileName, urlFilepath);
        }

        public Task<bool> DeleteFileAsync(string filePath)
        {
            try
            {
                var fileName = Path.GetFileName(filePath);
                var fullPath = Path.Combine(_webHostEnvironment.ContentRootPath, _imagesFolder, fileName);

                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                    return Task.FromResult(true);
                }

                return Task.FromResult(false);
            }
            catch (Exception)
            {
                return Task.FromResult(false);
            }
        }

        public string GetFileUrl(string fileName)
        {
            if (_contextAccessor.HttpContext != null)
            {
                return $"{_contextAccessor.HttpContext.Request.Scheme}://{_contextAccessor.HttpContext.Request.Host}" +
                       $"{_contextAccessor.HttpContext.Request.PathBase}/{_imagesFolder}/{fileName}";
            }
            
            // Fallback if HttpContext is not available
            return $"/{_imagesFolder}/{fileName}";
        }

        private string EnsureUniqueFileName(string folderPath, string fileName, string fileExtension)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                fileName = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            }

            string uniqueFileName = fileName;
            string fullPath = Path.Combine(folderPath, $"{uniqueFileName}{fileExtension}");
            
            int counter = 1;
            while (File.Exists(fullPath))
            {
                uniqueFileName = $"{fileName}_{counter}";
                fullPath = Path.Combine(folderPath, $"{uniqueFileName}{fileExtension}");
                counter++;
            }
            
            return uniqueFileName;
        }
    }
}