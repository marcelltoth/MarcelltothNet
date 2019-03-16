using System;
using System.Collections.Generic;

namespace SpaAggregator.Models
{
    public class Article
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