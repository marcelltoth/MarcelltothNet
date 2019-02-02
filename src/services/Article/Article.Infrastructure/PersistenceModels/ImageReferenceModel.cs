using System;
using MarcellTothNet.Services.Article.Domain.ArticleAggregate;

namespace MarcellTothNet.Services.Article.Infrastructure.PersistenceModels
{
    /// <summary>
    ///     Persistence model for <see cref="Domain.ArticleAggregate.ImageReference"/>.
    /// </summary>
    public class ImageReferenceModel
    {
        public Uri Location { get; set; }

        public string AltText { get; set; }

        public static ImageReferenceModel FromDomainModel(ImageReference domainModel)
        {
            return new ImageReferenceModel
            {
                Location = domainModel.Location,
                AltText = domainModel.AltText
            };
        }

        public ImageReference ToDomainModel()
        {
            return new ImageReference(Location, AltText);
        }
    }
}