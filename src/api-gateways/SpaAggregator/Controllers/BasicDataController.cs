using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SpaAggregator.DataTransfer;
using SpaAggregator.Services.DownstreamClients;

namespace SpaAggregator.Controllers
{
    [Route("v1/basic-data")]
    public class BasicDataController : Controller
    {
        private readonly ArticleApiClient _articleClient;

        public BasicDataController(ArticleApiClient articleClient)
        {
            _articleClient = articleClient;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var articleTask = _articleClient.GetAllArticles();
            var tagTask = _articleClient.GetAllTags();
            return Ok(new BasicDataDto
            {
                Articles = await articleTask,
                Tags = await tagTask
            });
        }
    }
}