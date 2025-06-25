using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace IdentityManager.Services.Infrastructure.Interfaces
{
    /// <summary>
    /// Interface for file storage operations, abstracting the actual storage mechanism
    /// </summary>
    public interface IFileStorageService
    {
        Task<(string fileName, string filePath)> SaveFileAsync(IFormFile file, string baseName = null);
        Task<bool> DeleteFileAsync(string filePath);
        string GetFileUrl(string fileName);
    }
}