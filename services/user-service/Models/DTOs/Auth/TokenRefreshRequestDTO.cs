using System.ComponentModel.DataAnnotations;

namespace Models.DTOs.Auth
{
    public class TokenRefreshRequestDTO
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}