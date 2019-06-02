using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarcellTothNet.Services.Article.Api.Queries
{
    /// <summary>
    ///     Query object on the article collection. Returns <see cref="ArticleViewModel"/>s.
    /// </summary>
    public interface IArticleQueries
    {
        /// <summary>
        ///     Loads the header and tag list of all articles. Does not load the <see cref="ArticleViewModel.Content"/> property.
        /// </summary>
        Task<IEnumerable<ArticleViewModel>> GetAllArticlesAsync();


        /// <summary>
        ///     Loads the header and tag list of all published articles. Does not load the <see cref="ArticleViewModel.Content"/> property.
        /// </summary>
        Task<IEnumerable<ArticleViewModel>> GetAllPublishedArticlesAsync();


        /// <summary>
        ///     Loads all data about a single article including its content.
        /// </summary>
        Task<ArticleViewModel> GetArticleAsync(int articleId);
    }
}