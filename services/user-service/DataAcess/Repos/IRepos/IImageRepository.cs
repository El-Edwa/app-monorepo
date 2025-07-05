using Models.Domain;
using System.Threading.Tasks;

namespace DataAcess.Repos.IRepos
{
    /// <summary>
    /// Repository interface for Image entity operations
    /// </summary>
    public interface IImageRepository
    {
        /// <summary>
        /// Creates a new image record in the database
        /// </summary>
        Task<Image> CreateAsync(Image image);
        
        /// <summary>
        /// Gets an image by ID
        /// </summary>
        Task<Image> GetByIdAsync(int id);
        
        /// <summary>
        /// Deletes an image
        /// </summary>
        Task<bool> DeleteAsync(int id);
    }
}
