using System.Threading.Tasks;
using MarcellTothNet.Common.DDDFoundations;

namespace MarcellTothNet.Services.Article.Domain.ArticleAggregate
{
    /// <summary>
    ///     Repository interface for the article aggregate.
    /// </summary>
    public interface IArticleRepository : IRepository<Article>
    {
        /// <summary>
        ///     Fetches an Article aggregate by it's ID. The entity is not updated unless a call is made to <see cref="Update"/>;
        /// </summary>
        /// <param name="articleId">The ID of the article to load.</param>
        /// <returns>The root of the aggregate.</returns>
        Task<Article> GetByIdAsync(int articleId);

        /// <summary>
        ///     Adds a new Article aggregate to the <see cref="IRepository{Article}.UnitOfWork"/> in its current form. Further changes are not tracked.
        /// </summary>
        /// <param name="article">The <see cref="Article"/> instance to add.</param>
        void Add(Article article);

        /// <summary>
        ///     Updates <see cref="IRepository{Article}.UnitOfWork"/> to store the current state of <paramref name="article"/>.
        /// </summary>
        void Update(Article article);

        /// <summary>
        ///     Deletes an Article aggregate and its dependents from the storage.
        /// </summary>
        /// <param name="articleId">The ID of the article to remove</param>
        void Delete(int articleId);
    }
}