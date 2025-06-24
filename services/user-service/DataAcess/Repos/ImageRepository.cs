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

        public ImageRepository(ApplicationDbContext db, IWebHostEnvironment webHostEnvironment ,IHttpContextAccessor contextAccessor)
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

            var folderPath = Path.Combine(webHostEnvironment.ContentRootPath, "Images");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var localFilepath = Path.Combine(folderPath, $"{image.FileName}{image.FileExtension}");

            Console.WriteLine($"Saving to: {localFilepath}");
            Console.WriteLine($"File Size: {image.File.Length} bytes");

            using (var fileStream = new FileStream(localFilepath, FileMode.CreateNew))
            {
                await image.File.CopyToAsync(fileStream);
            }

            var urlFilepath = $"{contextAccessor.HttpContext.Request.Scheme}://{contextAccessor.HttpContext.Request.Host}" +
                              $"{contextAccessor.HttpContext.Request.PathBase}/Images/{image.FileName}{image.FileExtension}";

            image.FilePath = urlFilepath;
            await db.Image.AddAsync(image);
            await db.SaveChangesAsync();

            return image;
        }

    }
}
