using Microsoft.EntityFrameworkCore.Migrations;

namespace MarcellTothNet.Services.Article.Api.Infrastructure.Migrations
{
    public partial class AddArticleIsPublished : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPublished",
                table: "Articles",
                nullable: false,
                defaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPublished",
                table: "Articles");
        }
    }
}
