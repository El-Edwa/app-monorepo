using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            Dictionary<string, string> roles = new Dictionary<string, string>
            {
                { "43d0590f-2f82-4867-83c4-18f0488f9706", "admin" },
                { "ff715d53-7725-48de-8d74-f064b8b41b45", "user" },
                { "5654533a-52b5-4e1e-b9e5-fd8036ef35ff", "manager" },
                { "2b440d41-47fa-4fe5-ae96-b4ae34d223a1", "guest" }
            };

            foreach (var role in roles)
            {
                builder.HasData(new IdentityRole
                {
                    Id = role.Key,
                    Name = role.Value,
                    NormalizedName = role.Value.ToUpper()
                });
            }
        }
    }
}
