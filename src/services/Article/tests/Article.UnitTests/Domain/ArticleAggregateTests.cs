

using System;
using System.Collections.Generic;
using System.Linq;
using MarcellTothNet.Services.Article.Domain.ArticleAggregate;
using Xunit;

namespace MarcellTothNet.Services.Article.UnitTests.Domain
{
    public class ArticleAggregateTests
    {
        
        private readonly Article.Domain.ArticleAggregate.Article _testArticle = new Article.Domain.ArticleAggregate.Article()
        {
            Id = 3,
            Content = "Test content",
            PublishTime = DateTimeOffset.FromUnixTimeSeconds(10240),
            Thumbnail = new ImageReference("thumbnail.png", "Test thumbnail"),
            Title = "Test title"
        };


        /// <summary>
        ///     Checks if the <see cref="Article.TagIds"/> property returns an empty <see cref="IEnumerable{Int32}"/> on a fresh article.
        /// </summary>
        [Fact]
        public void TagIds_Default_EmptyButNotNull()
        {
            Assert.NotNull(_testArticle.TagIds);
            Assert.Empty(_testArticle.TagIds);
        }

        /// <summary>
        ///     Checks if the <see cref="Article.AddTagId"/> method correctly adds two new distinct tags to the collection.
        /// </summary>
        [Fact]
        public void AddTagId_TwoNewTags_AddsCorrectly()
        {
            bool return1 = _testArticle.AddTagId(2);
            bool return2 = _testArticle.AddTagId(3);

            Assert.True(return1);
            Assert.True(return2);
            Assert.Equal(new[]{2,3}, _testArticle.TagIds);
        }

        /// <summary>
        ///     Checks if adding the same tag ID twice to an <see cref="Article"/> results in the second addition being discarded.
        /// </summary>
        [Fact]
        public void AddTagId_SameTagTwice_DiscardsSecond()
        {
            _testArticle.AddTagId(2);

            bool return2 = _testArticle.AddTagId(2);

            Assert.False(return2);
            Assert.Single(_testArticle.TagIds, 2);
        }

        /// <summary>
        ///     Checks if removing an existing tag ID from the collection works correctly.
        /// </summary>
        [Fact]
        public void RemoveTagId_Existing_RemovesCorrectly()
        {
            _testArticle.AddTagId(2);
            _testArticle.AddTagId(3);

            bool returnValue = _testArticle.RemoveTagId(2);

            Assert.True(returnValue);
            Assert.Single(_testArticle.TagIds, 3);
        }

        /// <summary>
        ///     Verifies that removing a nonexistent tag ID from the collection is a noop (and returns false).
        /// </summary>
        [Fact]
        public void RemoveTagId_NonExistent_Noop()
        {
            _testArticle.AddTagId(2);

            bool returnValue = _testArticle.RemoveTagId(4);

            Assert.False(returnValue);
            Assert.Single(_testArticle.TagIds, 2);
        }

        [Fact]
        public void ReplaceTagIds_Default_ReplacesOldTags()
        {
            _testArticle.AddTagId(2);
            var newTags = new[] { 3, 4 };

            _testArticle.ReplaceTagIds(newTags);

            Assert.Equal(_testArticle.TagIds, newTags);
        }
    }
}