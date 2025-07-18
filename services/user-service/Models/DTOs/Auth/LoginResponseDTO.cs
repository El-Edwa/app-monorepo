﻿using Models.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs.Auth
{
    public class LoginResponseDTO
    {
        public UserDTO User { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
        
        // Authentication metadata
        public DateTime TokenExpiration { get; set; }
        public bool IsAuthenticated => !string.IsNullOrEmpty(Token);
    }
}
