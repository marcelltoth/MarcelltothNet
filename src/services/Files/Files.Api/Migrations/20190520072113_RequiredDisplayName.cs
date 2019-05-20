using Microsoft.EntityFrameworkCore.Migrations;

namespace MarcellTothNet.Services.Files.Api.Migrations
{
    public partial class RequiredDisplayName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DisplayName",
                table: "Files",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DisplayName",
                table: "Files",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
