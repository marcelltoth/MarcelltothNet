using System;

namespace MarcellTothNet.Services.Article.Infrastructure.PersistenceModels
{
    /// <summary>
    ///     Persistence model for <see cref="MarcellTothNet.Article"/>
    /// </summary>
    public class ArticleModel
    {
        /// <summary>
        ///     The title of the blog article.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        ///     The publish time of the article.
        /// </summary>
        public DateTimeOffset PublishTime { get; set; }

        /// <summary>
        ///     The content of the article. Formatted as HTML.
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        ///     The thumbnail that will show up on the home page.
        /// </summary>
        public  Thumbnail { get; set; }
    }
}