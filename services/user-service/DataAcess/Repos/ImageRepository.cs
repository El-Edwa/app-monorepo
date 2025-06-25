using DataAcess.Repos.IRepos;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Repos
{
    public class ImageRepository : IImageRepository
    {
        private readonly ApplicationDbContext db;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor contextAccessor;

        public ImageRepository(ApplicationDbContext db, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor contextAccessor)
        {
            this.db = db;
            this.webHostEnvironment = webHostEnvironment;
            this.contextAccessor = contextAccessor;
        }

        public async Task<Image> Upload(Image image)
        {
            if (image.File == null || image.File.Length == 0)
            {
                throw new ArgumentException("Uploaded file is empty or null.");
            }

            try
            {
                // Create the Images directory if it doesn't exist
                var folderPath = Path.Combine(webHostEnvironment.ContentRootPath, "Images");
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                // Ensure the filename is unique to avoid conflicts
                var uniqueFileName = EnsureUniqueFileName(folderPath, image.FileName, image.FileExtension);
                image.FileName = uniqueFileName;

                var localFilepath = Path.Combine(folderPath, $"{uniqueFileName}{image.FileExtension}");

                Console.WriteLine($"Saving to: {localFilepath}");
                Console.WriteLine($"File Size: {image.File.Length} bytes");

                // Save the file to disk
                using (var fileStream = new FileStream(localFilepath, FileMode.Create))
                {
                    await image.File.CopyToAsync(fileStream);
                }

                // Build the URL for accessing the image
                if (contextAccessor.HttpContext != null)
                {
                    var urlFilepath = $"{contextAccessor.HttpContext.Request.Scheme}://{contextAccessor.HttpContext.Request.Host}" +
                                      $"{contextAccessor.HttpContext.Request.PathBase}/Images/{uniqueFileName}{image.FileExtension}";
                    image.FilePath = urlFilepath;
                }
                else
                {
                    // Fallback if HttpContext is not available
                    image.FilePath = $"/Images/{uniqueFileName}{image.FileExtension}";
                }

                // Save the image record to the database
                // Explicitly set Id to 0 to ensure it gets a new Id from the database
                image.Id = 0;
                await db.Image.AddAsync(image);
                await db.SaveChangesAsync();

                // Verify the image was saved and has a valid Id
                if (image.Id <= 0)
                {
                    throw new Exception("Failed to save image to database");
                }

                return image;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in ImageRepository.Upload: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                
                throw new Exception($"Failed to upload image: {ex.Message}", ex);
            }
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
