using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MarcellTothNet.Services.Article.Api.Contract;
using MarcellTothNet.Services.Article.Api.Models;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace MarcellTothNet.Services.Article.IntegrationTests.Mapping
{
    /// <summary>
    ///     Tests mapping <see cref="Api.Models.Article"/> models from and to <see cref="ArticleDto"/>s.
    /// </summary>
    public class ArticleDtoMappingTests : IClassFixture<WebHostFixture>
    {
        private readonly IMapper _mapper;

        public ArticleDtoMappingTests(WebHostFixture fixture)
        {
            _mapper = fixture.Host.Services.GetService<IMapper>();
            Assert.NotNull(_mapper);
        }

        /// <summary>
        ///     This test maps an <see cref="Api.Models.Article"/> object that has its <see cref="Api.Models.Article.ArticleTags"/> field set to null to a DTO and checks that all other fields are present and correct.
        /// </summary>
        [Fact]
        public void MapToDto_WithoutTags_Correct()
        {
            const int id = 42;
            const string title = "Hello title";
            const string content = "Hello content";
            var publishTime = DateTimeOffset.FromUnixTimeSeconds(123456);
            var source = new Api.Models.Article()
            {
                Id = id,
                Title = title,
                Content = content,
                PublishTime = publishTime
            };

            var dto = _mapper.Map<ArticleDto>(source);

            Assert.Equal(id, dto.Id);
            Assert.Equal(title, dto.Title);
            Assert.Equal(content, dto.Content);
            Assert.Equal(publishTime, dto.PublishTime);
        }

        /// <summary>
        ///     Maps an <see cref="Api.Models.Article"/> object with some <see cref="Api.Models.ArticleTag"/>s to a DTO and checks if the tags were mapped correctly.
        /// </summary>
        [Fact]
        public void MapToDto_Tags_Correct()
        {
            const int tagId = 92;
            var tag = new Tag()
            {
                Id = tagId,
                DisplayName = "helloTag"
            };
            var articleTag = new ArticleTag
            {
                ArticleId = 42,
                TagId = tagId,
                Tag = tag
            };
            var article = new Api.Models.Article()
            {
                ArticleTags = new List<ArticleTag> { articleTag }
            };
            articleTag.Article = article;
            tag.ArticleTags = new List<ArticleTag> {articleTag};

            var dto = _mapper.Map<ArticleDto>(article);

            Assert.NotEmpty(dto.Tags);
            Assert.Equal(dto.Tags.FirstOrDefault(), tagId);
        }

        /// <summary>
        ///     This test maps an <see cref="ArticleDto"/> object that has its <see cref="ArticleDto.Tags"/> field set to null to a domain article object and checks that all other fields are present and correct.
        /// </summary>
        [Fact]
        public void MapFromDto_WithoutTags_Correct()
        {
            const int id = 42;
            const string title = "Hello title";
            const string content = "Hello content";
            var publishTime = DateTimeOffset.FromUnixTimeSeconds(123456);
            var source = new ArticleDto()
            {
                Id = id,
                Title = title,
                Content = content,
                PublishTime = publishTime
            };


            var article = _mapper.Map<Api.Models.Article>(source);


            Assert.Equal(id, article.Id);
            Assert.Equal(title, article.Title);
            Assert.Equal(content, article.Content);
            Assert.Equal(publishTime, article.PublishTime);
        }

        /// <summary>
        ///     Maps an <see cref="ArticleDto"/> object with some tag ids to a domain object and checks if the tags were mapped correctly.
        /// </summary>
        /// <remarks>
        ///     The correct implementation of this would be to overwrite the database configuration to an InMemory data store, and put in the test tag automatically.
        ///     Here I am just going to assume that there exist a tag called TestTag in the DB with the ID of 1.
        /// </remarks>
        [Fact]
        public void MapFromDto_Tags_Correct()
        {
            var source = new ArticleDto()
            {
                Id = 42,
                Tags = new List<int> { 1 }
            };


            var domainModel = _mapper.Map<Api.Models.Article>(source);


            Assert.NotNull(domainModel.ArticleTags);
            Assert.Equal(1, domainModel.ArticleTags.Count);

            var articleTag = domainModel.ArticleTags.First();
            Assert.Equal(domainModel, articleTag.Article);
            Assert.Equal(42, articleTag.ArticleId);
            Assert.Equal(1, articleTag.TagId);
            Assert.NotNull(articleTag.Tag);
            Assert.Equal("TestTag", articleTag.Tag.DisplayName);
        }

        /// <summary>
        ///     Maps an <see cref="ArticleDto"/> object with a tagid that is incorrect (nonexistent).
        /// </summary>
        [Fact]
        public void MapFromDto_Tags_HandlesNonexistent()
        {
            var source = new ArticleDto()
            {
                Id = 42,
                Tags = new List<int> { Int32.MaxValue }
            };


            var domainModel = _mapper.Map<Api.Models.Article>(source);


            Assert.NotNull(domainModel.ArticleTags);
            Assert.Empty(domainModel.ArticleTags);
        }
    }
}