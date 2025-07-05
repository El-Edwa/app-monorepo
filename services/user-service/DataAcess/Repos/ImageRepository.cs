using DataAcess.Repos.IRepos;
using Models.Domain;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DataAcess.Repos
{
    /// <summary>
    /// Repository implementation for Image entity
    /// This handles database operations only
    /// </summary>
    public class ImageRepository : IImageRepository
    {
        private readonly ApplicationDbContext _db;

        public ImageRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<Image> CreateAsync(Image image)
        {
            try
            {
                // Ensure Id is 0 for new entity
                image.Id = 0;
                
                await _db.Image.AddAsync(image);
                await _db.SaveChangesAsync();

                // Verify the image was saved and has a valid Id
                if (image.Id <= 0)
                {
                    throw new Exception("Failed to save image to database");
                }

                return image;
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to create image in database: {ex.Message}", ex);
            }
        }

        public async Task<Image> GetByIdAsync(int id)
        {
            return await _db.Image.FindAsync(id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var image = await _db.Image.FindAsync(id);
                
                if (image == null)
                {
                    return false;
                }

                _db.Image.Remove(image);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
