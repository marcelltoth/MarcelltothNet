using MarcellTothNet.Services.Article.Infrastructure.PersistenceModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarcellTothNet.Services.Article.Infrastructure.EntityConfigurations
{
    public class ArticleTagTypeConfiguration : IEntityTypeConfiguration<ArticleTagModel>
    {
        public void Configure(EntityTypeBuilder<ArticleTagModel> builder)
        {
            builder.ToTable("Article2Tag");

            builder.HasKey(at => new {at.ArticleId, at.TagId});

            builder.HasOne(at => at.Article)
                .WithMany(a => a.ArticleTags);

            builder.HasOne(at => at.Tag)
                .WithMany();
        }
    }
}