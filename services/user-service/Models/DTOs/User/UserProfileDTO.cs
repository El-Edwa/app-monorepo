using System;
using System.ComponentModel.DataAnnotations;

namespace Models.DTOs.User
{
    public class UserProfileDTO
    {
        public string Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string UserName { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        [StringLength(255)]
        public string Bio { get; set; }
        
        [StringLength(100)]
        public string Location { get; set; }
        
        [StringLength(100)]
        [Url]
        public string WebsiteUrl { get; set; }
        
        public string ProfileImageUrl { get; set; }
        
        public string BackgroundImageUrl { get; set; }
        
        public DateTime JoinDate { get; set; }
        
        // Constants until you implement real follower functionality
        public int FollowersCount { get; set; } = 0;
        public int FollowingCount { get; set; } = 0;
    }
}