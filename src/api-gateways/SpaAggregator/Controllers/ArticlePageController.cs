using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using SpaAggregator.DataTransfer;
using SpaAggregator.Services.DownstreamClients;

namespace SpaAggregator.Controllers
{
    [Route("v1/article-page/")]
    public class ArticlePageController : Controller
    {
        private readonly ArticleApiClient _articleApiClient;

        public ArticlePageController(ArticleApiClient articleApiClient)
        {
            _articleApiClient = articleApiClient;
        }

        [Route("{articleId}")]
        public async Task<IActionResult> Get([FromRoute] int articleId)
        {
            var article = await _articleApiClient.GetArticleDetails(articleId);

            return Ok(new ArticlePageDto
            {
                Article = article
            });
        }
    }
}