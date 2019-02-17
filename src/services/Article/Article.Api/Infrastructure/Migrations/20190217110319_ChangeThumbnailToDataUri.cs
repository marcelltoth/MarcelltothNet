using Microsoft.EntityFrameworkCore.Migrations;

namespace MarcellTothNet.Services.Article.Api.Infrastructure.Migrations
{
    public partial class ChangeThumbnailToDataUri : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Thumbnail_Location",
                table: "Articles",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 512);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Thumbnail_Location",
                table: "Articles",
                maxLength: 512,
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
