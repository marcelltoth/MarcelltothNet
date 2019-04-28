
using System.Linq;
using System.Threading.Tasks;
using MarcellToth.DDDBuildingBlocks.Persistence.Abstractions;
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

        public Task AddAsync(Domain.ArticleAggregate.Article article)
        {
            var mappedModel = ArticleMapper.MapToDataModel(article);
            _dbContext.ArticleModels.Add(mappedModel);
            article.SetId(mappedModel.Id);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(Domain.ArticleAggregate.Article article)
        {
            ArticleModel target = _dbContext.ArticleModels.Local.FirstOrDefault(am => am.Id == article.Id);
            _dbContext.Entry(ArticleMapper.MapToDataModel(article, target)).State = EntityState.Modified;
            return Task.CompletedTask;
        }

        public Task DeleteAsync(int articleId)
        {
            _dbContext.ArticleModels.Remove(new ArticleModel {Id = articleId});
            return Task.CompletedTask;
        }

        private static class ArticleMapper
        {
            public static Domain.ArticleAggregate.Article MapToDomainModel(ArticleModel dataModel)
            {
                if (dataModel == null)
                    return null;

                return new Domain.ArticleAggregate.Article(dataModel.Id, dataModel.Title, dataModel.PublishTime,
                    dataModel.Content, dataModel.Thumbnail.ToDomainModel(),
                    dataModel.ArticleTags.Select(at => at.TagId), dataModel.IsPublished);
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
                    target.ArticleTags.Add(new ArticleTagModel
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