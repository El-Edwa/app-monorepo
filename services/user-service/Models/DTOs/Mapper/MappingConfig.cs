using AutoMapper;
using Models.Domain;
using Models.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs.Mapper
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<ApplicationUser, UserDTO>()
                .ForMember(dest => dest.ProfileImageUrl, opt => opt.MapFrom(src => 
                    src.Image != null ? src.Image.FilePath : null))
                .ReverseMap();
            
            CreateMap<ApplicationUser, UserProfileDTO>()
                .ForMember(dest => dest.ProfileImageUrl, opt => opt.MapFrom(src => 
                    src.Image != null ? src.Image.FilePath : null))
                .ForMember(dest => dest.BackgroundImageUrl, opt => opt.MapFrom(src => 
                    src.BackgroundImage != null ? src.BackgroundImage.FilePath : null))
                .ForMember(dest => dest.JoinDate, opt => opt.MapFrom(src => 
                    src.CreatedDate))
                .ReverseMap();
            
            // Mapping for the ProfileUpdateDTO (one-way only, no reverse mapping needed)
            CreateMap<ProfileUpdateDTO, ApplicationUser>();
        }
    }
}
