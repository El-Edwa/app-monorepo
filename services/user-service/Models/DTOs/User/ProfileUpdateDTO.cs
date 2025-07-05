using System.ComponentModel.DataAnnotations;

namespace Models.DTOs.User
{
    public class ProfileUpdateDTO
    {
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters")]
        public string Name { get; set; }
        
        [StringLength(255, ErrorMessage = "Bio cannot exceed 255 characters")]
        public string Bio { get; set; }
        
        [StringLength(100, ErrorMessage = "Location cannot exceed 100 characters")]
        public string Location { get; set; }
        
        [StringLength(100, ErrorMessage = "Website URL cannot exceed 100 characters")]
        [Url(ErrorMessage = "Please enter a valid URL")]
        public string WebsiteUrl { get; set; }
    }
}