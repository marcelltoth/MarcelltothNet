using MarcellTothNet.Services.Files.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace MarcellTothNet.Services.Files.Api
{
    public class FilesDbContext : DbContext
    {
        public FilesDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<File> Files { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<File>(file =>
            {
                file.Property(f => f.Id)
                    .HasDefaultValueSql("newid()");

                file.Property(f => f.Content)
                    .IsRequired();

                file.Property(f => f.MimeType)
                    .IsRequired();

            });
        }
    }
}
