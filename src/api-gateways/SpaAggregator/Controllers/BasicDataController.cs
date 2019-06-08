using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SpaAggregator.DataTransfer;
using SpaAggregator.Models;
using SpaAggregator.Services;
using SpaAggregator.Services.DownstreamClients;

namespace SpaAggregator.Controllers
{
    [Route("v1/basic-data")]
    public class BasicDataController : Controller
    {
        private readonly ArticleApiClient _articleClient;
        private readonly ThumbnailRepository _thumbnailRepository;

        public BasicDataController(ArticleApiClient articleClient, ThumbnailRepository thumbnailRepository)
        {
            _articleClient = articleClient;
            _thumbnailRepository = thumbnailRepository;
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

        [HttpGet("thumbnails")]
        [ResponseCache(Location = ResponseCacheLocation.Client, VaryByQueryKeys = new[]{"*"}, Duration = 3600)]
        public async Task<IActionResult> GetThumbnails([FromQuery] int[] ids, [FromQuery] int targetWidth)
        {
            ThumbnailImage[] thumbnails = await Task.WhenAll(ids.Select(async id =>
            {
                Article data = await _articleClient.GetArticleDetails(id);
                if (!data.ThumbnailLocation.StartsWith("data"))
                    return null;
                return await _thumbnailRepository.GetAsync(data.ThumbnailLocation, targetWidth, Int32.MaxValue);
            }));
            

            return Ok(thumbnails.Select(t => t?.ToDataUri()));
        }
    }
}