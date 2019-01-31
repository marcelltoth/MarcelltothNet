using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MarcellTothNet.Services.Article.Api.Models;

namespace MarcellTothNet.Services.Article.Api.Contract.Mapping
{
    public class DtoToArticleTagResolver : IValueResolver<ArticleDto, Models.Article, IList<ArticleTag>>
    {
        private readonly ArticleContext _articleContext;

        public DtoToArticleTagResolver(ArticleContext articleContext)
        {
            _articleContext = articleContext;
        }

        public IList<ArticleTag> Resolve(ArticleDto source, Models.Article destination, IList<ArticleTag> destMember, ResolutionContext context)
        {
            return source.Tags.Select(tagId => _articleContext.Tags.Find(tagId))
                .Where(tag => tag != null)
                .Select(tag => new ArticleTag
                {
                    ArticleId = source.Id,
                    Tag = tag,
                    TagId = tag.Id
                }).ToList();
        }

        public class SetArticleTagAction : IMappingAction<ArticleDto, Models.Article>
        {
            public void Process(ArticleDto source, Models.Article destination)
            {
                foreach (ArticleTag articleTag in destination.ArticleTags)
                {
                    articleTag.Article = destination;
                }
            }
        }
    }
}