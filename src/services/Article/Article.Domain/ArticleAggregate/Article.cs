using System;
using System.Collections.Generic;
using MarcellTothNet.Common.DDDFoundations;

namespace MarcellTothNet.Services.Article.Domain.ArticleAggregate
{
    /// <summary>
    ///     Represents a blog article.
    /// </summary>
    public class Article : Entity<int>, IAggregateRoot
    {
        private readonly HashSet<int> _tagIds;

        public Article()
        {
            _tagIds = new HashSet<int>();
        }

        public Article(string title, DateTimeOffset publishTime, string content, ImageReference thumbnail, IEnumerable<int> tagIds, bool isPublished = true)
        {
            Title = title;
            PublishTime = publishTime;
            Content = content;
            Thumbnail = thumbnail;
            IsPublished = isPublished;
            _tagIds = new HashSet<int>(tagIds);
        }

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
        public ImageReference Thumbnail { get; set; }

        /// <summary>
        ///     The list of the IDs of the tags that are associated with this article.
        /// </summary>
        public IEnumerable<int> TagIds => _tagIds;

        /// <summary>
        ///     Removes a tag from this article.
        /// </summary>
        /// <param name="tagId">The ID of the tag to remove.</param>
        /// <returns>True if removed, false if the article did not have the tag <paramref name="tagId"/>.</returns>
        public bool RemoveTagId(int tagId)
        {
            return _tagIds.Remove(tagId);
        }

        /// <summary>
        ///     Adds a tag to this article.
        /// </summary>
        /// <param name="tagId">The ID of the tag to add.</param>
        /// <returns>True if added, false if the article already had the tag <paramref name="tagId"/>.</returns>
        public bool AddTagId(int tagId)
        {
            return _tagIds.Add(tagId);
        }

        /// <summary>
        ///     Replaces the list of associated tags of this article.
        /// </summary>
        /// <param name="tags">The new list of tag IDs</param>
        public void ReplaceTagIds(IEnumerable<int> tags)
        {
            _tagIds.Clear();
            foreach (int tag in tags)
            {
                AddTagId(tag);
            }
        }

        /// <summary>
        ///     Whether the article is published. Non-published articles are not shown on the website, although they can be edited by the authors.
        /// </summary>
        public bool IsPublished { get; private set; }

        /// <summary>
        ///     Publishes the article. This makes it visible on the main site.
        /// </summary>
        public void Publish()
        {
            if(IsPublished)
                throw new ArticleDomainException("Article is already published");
            IsPublished = true;
        }

        /// <summary>
        ///     Un-publishes the article. This makes it invisible on the main site.
        /// </summary>
        public void Archive()
        {
            if (!IsPublished)
                throw new ArticleDomainException("Article is already archived");
            IsPublished = false;
        }
    }
}