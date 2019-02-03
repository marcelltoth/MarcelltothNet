using System;
using System.Collections.Generic;
using System.Linq;

namespace MarcellTothNet.Services.Article.Api.Commands
{
    /// <summary>
    ///     Base class for <see cref="CreateArticleCommand"/> and <see cref="UpdateArticleCommand"/> commands, containing the basic data for an article.
    /// </summary>
    public abstract class UpdateArticleCommandBase
    {
        /// <summary>
        ///     The title of this article.
        /// </summary>
        public string Title { get; }

        /// <summary>
        ///     The publish date of this article.
        /// </summary>
        public DateTimeOffset PublishDate { get; }

        /// <summary>
        ///     The location of the thumbnail image for this article.
        /// </summary>
        public string ThumbnailLocation { get; }

        /// <summary>
        ///     The alternate text for the thumbnail image for screen readers.
        /// </summary>
        public string ThumbnailAltText { get; }

        /// <summary>
        ///     The content of this article.
        /// </summary>
        public string Content { get; }

        /// <summary>
        ///     The list of tags associated with this article.
        /// </summary>
        public IReadOnlyCollection<int> TagIds { get; }

        protected UpdateArticleCommandBase(string title, DateTimeOffset publishDate, string thumbnailLocation, string thumbnailAltText, string content, IEnumerable<int> tagIds)
        {
            Title = title;
            PublishDate = publishDate;
            ThumbnailLocation = thumbnailLocation;
            ThumbnailAltText = thumbnailAltText;
            Content = content;
            TagIds = tagIds.ToList();
        }
    }
}