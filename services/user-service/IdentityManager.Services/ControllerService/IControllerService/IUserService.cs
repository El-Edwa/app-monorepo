using Models.DTOs.image;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdentityManager.Services.ControllerService.IControllerService
{
    public interface IUserService
    {
        Task<object> UploadUserImageAsync(string userId, ImageUploadRequestDto request);
    }
}
