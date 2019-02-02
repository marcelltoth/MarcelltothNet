using MarcellTothNet.Services.Article.Domain.TagAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarcellTothNet.Services.Article.Infrastructure.EntityConfigurations
{
    public class TagTypeConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            builder.ToTable("Tags");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.DisplayName).IsRequired().HasMaxLength(64);
        }
    }
}