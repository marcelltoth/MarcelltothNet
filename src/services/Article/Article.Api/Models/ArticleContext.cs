using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace MarcellTothNet.Services.Article.Api.Models
{
    public class ArticleContext : DbContext
    {
        public ArticleContext(DbContextOptions<ArticleContext> options) : base(options)
        {
        }

        public DbSet<Article> Articles { get; set; }

        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>(builder =>
            {
                builder.HasKey(a => a.Id);
                builder.ToTable("Articles");
                builder.Property(a => a.PublishTime)
                    .IsRequired(false);

                builder.Property(a => a.Title)
                    .IsRequired()
                    .HasMaxLength(250);

                builder.Property(a => a.Content)
                    .IsRequired();

            });

            modelBuilder.Entity<Tag>(builder =>
            {
                builder.HasKey(t => t.Id);
                builder.ToTable("Tags");
                builder.Property(t => t.DisplayName)
                    .IsRequired()
                    .HasMaxLength(120);
            });

            modelBuilder.Entity<ArticleTag>(builder =>
            {
                builder.HasKey(at => new {at.ArticleId, at.TagId});
                builder.HasOne(at => at.Article)
                    .WithMany(a => a.ArticleTags)
                    .HasForeignKey(at => at.ArticleId);
                builder.HasOne(at => at.Tag)
                    .WithMany(t => t.ArticleTags)
                    .HasForeignKey(at => at.TagId);
            });
        }
    }
}