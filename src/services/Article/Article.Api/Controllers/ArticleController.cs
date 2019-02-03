using System;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Api.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace MarcellTothNet.Services.Article.Api.Controllers
{
    [Route("api/v1/articles")]
    public class ArticleController : Controller
    {
        private readonly IMediator _mediator;
        private readonly IArticleQueries _queries;

        public ArticleController(IArticleQueries queries, IMediator mediator)
        {
            _queries = queries;
            _mediator = mediator;
        }

        /// <summary>
        ///     Fetches all the articles in the system. Does not load the content, only metadata.
        /// </summary>
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _queries.GetAllArticlesAsync());
        }

        /// <summary>
        ///     Fetches a single article from the database. Returns all available data, including content.
        /// </summary>
        [HttpGet]
        [Route("{articleId}")]
        public async Task<IActionResult> GetSingle(int articleId)
        {
            ArticleViewModel article = await _queries.GetArticleAsync(articleId);
            if (article == null)
                return NotFound();
            return Ok(article);
        }


        [HttpPost]
        [Route("")]
        public IActionResult PostNew([FromBody] object dto)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        [Route("{articleId}")]
        public IActionResult Replace([FromRoute] int articleId, [FromBody] object dto)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        [Route("{articleId}")]
        public IActionResult Delete([FromRoute] int articleId)
        {
            throw new NotImplementedException();
        }

    }


}