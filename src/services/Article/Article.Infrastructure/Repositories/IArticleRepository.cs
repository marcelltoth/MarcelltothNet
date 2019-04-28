using MarcellToth.DDDBuildingBlocks.Persistence.Abstractions;

namespace MarcellTothNet.Services.Article.Infrastructure.Repositories
{
    /// <inheritdoc />
    public interface IArticleRepository : ICrudRepository<Domain.ArticleAggregate.Article, int>
    {
        
    }
}