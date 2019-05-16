using Microsoft.EntityFrameworkCore.Migrations;

namespace MarcellTothNet.Services.Files.Api.Migrations
{
    public partial class AddFileDisplayName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "Files",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "Files");
        }
    }
}
