using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Domain
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string Name { get; set; }
        
        public int? ImageId { get; set; }
        
        public int? BackgroundImageId { get; set; }
        
        [StringLength(255)]
        public string Bio { get; set; }
        
        [StringLength(100)]
        public string Location { get; set; }
        
        [StringLength(100)]
        [Url]
        public string WebsiteUrl { get; set; }
        
        // CreatedDate should be set only during account creation
        // and not updated during profile updates
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        
        public bool IsActive { get; set; } = true;
        
        // Navigation properties
        [ForeignKey("ImageId")]
        public Image Image { get; set; }
        
        [ForeignKey("BackgroundImageId")]
        public Image BackgroundImage { get; set; }
    }
}
