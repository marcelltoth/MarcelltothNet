using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MarcellTothNet.Services.Files.Api.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    MimeType = table.Column<string>(nullable: false),
                    Content = table.Column<byte[]>(nullable: false),
                    UploadDate = table.Column<DateTimeOffset>(nullable: false),
                    ModifyDate = table.Column<DateTimeOffset>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Files");
        }
    }
}
