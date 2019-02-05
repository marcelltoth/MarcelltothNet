using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarcellTothNet.Common.DDDFoundations;
using MarcellTothNet.Services.Article.Domain.ArticleAggregate;
using MarcellTothNet.Services.Article.Infrastructure.PersistenceModels;
using Microsoft.EntityFrameworkCore;

namespace MarcellTothNet.Services.Article.Infrastructure.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly ArticleContext _dbContext;

        public ArticleRepository(ArticleContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IUnitOfWork UnitOfWork => _dbContext;

        public async Task<Domain.ArticleAggregate.Article> GetByIdAsync(int articleId)
        {
            return ArticleMapper.MapToDomainModel(
                await _dbContext.ArticleModels.Include(a => a.ArticleTags).FirstOrDefaultAsync(a => a.Id == articleId)
                );
        }

        public void Add(Domain.ArticleAggregate.Article article)
        {
            var mappedModel = ArticleMapper.MapToDataModel(article);
            _dbContext.ArticleModels.Add(mappedModel);
            article.Id = mappedModel.Id;
        }

        public void Update(Domain.ArticleAggregate.Article article)
        {
            ArticleModel target = _dbContext.ArticleModels.Local.FirstOrDefault(am => am.Id == article.Id);
            _dbContext.Entry(ArticleMapper.MapToDataModel(article, target)).State = EntityState.Modified;
        }

        public void Delete(int articleId)
        {
            _dbContext.ArticleModels.Remove(new ArticleModel {Id = articleId});
        }

        private static class ArticleMapper
        {
            public static Domain.ArticleAggregate.Article MapToDomainModel(ArticleModel dataModel)
            {
                if (dataModel == null)
                    return null;

                return new Domain.ArticleAggregate.Article(dataModel.Title, dataModel.PublishTime, dataModel.Content, dataModel.Thumbnail.ToDomainModel(),
                    dataModel.ArticleTags.Select(at => at.TagId), dataModel.IsPublished)
                {
                    Id = dataModel.Id
                };
            }

            public static ArticleModel MapToDataModel(Domain.ArticleAggregate.Article domainModel, ArticleModel target = null)
            {
                if(target == null)
                    target = new ArticleModel();

                target.Id = domainModel.Id;
                target.Title = domainModel.Title;
                target.Content = domainModel.Content;
                target.PublishTime = domainModel.PublishTime;
                target.Thumbnail = ImageReferenceModel.FromDomainModel(domainModel.Thumbnail);
                target.IsPublished = domainModel.IsPublished;

                target.ArticleTags.Clear();
                foreach (int tagId in domainModel.TagIds)
                {
                    target.ArticleTags.Add(new ArticleTagModel()
                    {
                        Article = target,
                        ArticleId = target.Id,
                        TagId = tagId
                    });
                }

                return target;
            }
        }
    }
}