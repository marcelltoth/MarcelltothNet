using MediatR;

namespace MarcellTothNet.Services.Article.Api.Commands
{
    /// <summary>
    ///     Command to publish an article.
    ///     Handlers should return true on success, false if not found.
    /// </summary>
    public class PublishArticleCommand : IRequest<bool>
    {
        public PublishArticleCommand(int articleId)
        {
            ArticleId = articleId;
        }

        /// <summary>
        ///     The ID of the article to publish.
        /// </summary>
        public int ArticleId { get; }
    }
}