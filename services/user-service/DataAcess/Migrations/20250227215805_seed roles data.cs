using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAcess.Migrations
{
    /// <inheritdoc />
    public partial class seedrolesdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "43d0590f-2f82-4867-83c4-18f0488f9706", null, "admin", "ADMIN" },
                    { "ff715d53-7725-48de-8d74-f064b8b41b45", null, "user", "USER" },
                    { "new-role-id-1", null, "manager", "MANAGER" },
                    { "new-role-id-2", null, "guest", "GUEST" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "43d0590f-2f82-4867-83c4-18f0488f9706");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ff715d53-7725-48de-8d74-f064b8b41b45");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "new-role-id-1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "new-role-id-2");
        }
    }
}
