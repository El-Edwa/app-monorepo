using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Domain
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string Name { get; set; }
        public int? ImageId { get; set; }
        
        // Navigation property
        [ForeignKey("ImageId")]
        public Image Image { get; set; }
    }
}
