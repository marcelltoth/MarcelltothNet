using System.Threading.Tasks;
using MarcellTothNet.Common.DDDFoundations;

namespace MarcellTothNet.Article.Domain.ArticleAggregate
{
    /// <summary>
    ///     Repository interface for the article aggregate.
    /// </summary>
    public interface IArticleRepository : IRepository<Article>
    {
        /// <summary>
        ///     Fetches an Article aggregate by it's ID, and starts tracking it in the <see cref="IRepository{Article}.UnitOfWork"/>.
        /// </summary>
        /// <param name="articleId">The ID of the article to load.</param>
        /// <returns>The root of the aggregate.</returns>
        Task<Article> GetByIdAsync(int articleId);

        /// <summary>
        ///     Adds a new Article aggregate to the <see cref="IRepository{Article}.UnitOfWork"/> and starts tracking its changes.
        /// </summary>
        /// <param name="article">The <see cref="Article"/> instance to add.</param>
        void Add(Article article);

        /// <summary>
        ///     Deletes an Article aggregate and its dependents from the storage.
        /// </summary>
        /// <param name="article">The <see cref="Article"/> root of the aggregate to remove.</param>
        void Delete(Article article);
    }
}