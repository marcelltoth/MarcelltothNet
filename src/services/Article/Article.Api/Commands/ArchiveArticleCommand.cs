using MediatR;
using Newtonsoft.Json;

namespace MarcellTothNet.Services.Article.Api.Commands
{
    /// <summary>
    ///     Command to archive an article.
    ///     Handlers should return true on success, false if not found.
    /// </summary>
    public class ArchiveArticleCommand : IRequest<bool>
    {
        [JsonConstructor]
        public ArchiveArticleCommand(int articleId)
        {
            ArticleId = articleId;
        }

        /// <summary>
        ///     The ID of the article to archive.
        /// </summary>
        public int ArticleId { get; }
    }
}