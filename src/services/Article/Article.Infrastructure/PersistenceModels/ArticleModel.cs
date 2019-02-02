using System;
using System.Collections.Generic;

namespace MarcellTothNet.Services.Article.Infrastructure.PersistenceModels
{
    /// <summary>
    ///     Persistence model for <see cref="Domain.ArticleAggregate.Article"/>.
    /// </summary>
    public class ArticleModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTimeOffset PublishTime { get; set; }

        public string Content { get; set; }

        public ImageReferenceModel Thumbnail { get; set; }

        public List<ArticleTagModel> ArticleTags { get; set; } = new List<ArticleTagModel>();
    }
}