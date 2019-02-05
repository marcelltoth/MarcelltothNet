using System;
using System.Collections.Generic;

namespace MarcellTothNet.Services.Article.Api.Queries
{
    /// <summary>
    ///     View model of a tag. This is the result type that will be exposed to API clients.
    ///     The <see cref="Content"/> property may or may not be filled.
    /// </summary>
    public class ArticleViewModel
    {
        /// <summary>
        ///     The ID of the article.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        ///     The title of this article.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        ///     The publish date of this article.
        /// </summary>
        public DateTimeOffset PublishDate { get; set; }

        /// <summary>
        ///     The location of the thumbnail image for this article.
        /// </summary>
        public string ThumbnailLocation { get; set; }

        /// <summary>
        ///     The alternate text for the thumbnail image for screen readers.
        /// </summary>
        public string ThumbnailAltText { get; set; }

        /// <summary>
        ///     The content of this article. May not be filled, depending on the query.
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        ///     The list of tags associated with this article.
        /// </summary>
        public List<int> TagIds { get; set; } = new List<int>();

        /// <summary>
        ///     Whether the article is published.
        /// </summary>
        public bool IsPublished { get; set; }

    }
}