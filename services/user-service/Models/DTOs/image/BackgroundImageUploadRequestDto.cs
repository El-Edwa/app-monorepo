using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Models.DTOs.image
{
    public class BackgroundImageUploadRequestDto
    {
        [Required]
        public IFormFile File { get; set; }
    }
}