using System;
using MarcellTothNet.Services.Article.Infrastructure.PersistenceModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarcellTothNet.Services.Article.Infrastructure.EntityConfigurations
{
    public class ArticleTypeConfiguration : IEntityTypeConfiguration<ArticleModel>
    {
        public void Configure(EntityTypeBuilder<ArticleModel> builder)
        {
            builder.ToTable("Articles");

            builder.HasKey(a => a.Id);


            builder.Property(a => a.Id)
                .ForSqlServerUseSequenceHiLo();

            builder.Property(a => a.Title)
                .IsRequired()
                .HasMaxLength(240);

            builder.Property(a => a.Content)
                .IsRequired();

            builder.Property(a => a.PublishTime)
                .IsRequired();

            // Store the thumbnail data in the same table using EF Core 2.0's Owned Entities feature.
            builder.OwnsOne(a => a.Thumbnail, irm =>
            {
                irm.Property(p => p.Location)
                    .HasConversion(v => v.ToString(), v => new Uri(v))
                    .HasMaxLength(512)
                    .IsRequired();

                irm.Property(p => p.AltText)
                    .HasMaxLength(512)
                    .IsRequired();
            });

        }
    }
}