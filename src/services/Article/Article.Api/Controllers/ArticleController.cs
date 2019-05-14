using System;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Api.Commands;
using MarcellTothNet.Services.Article.Api.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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

        /// <summary>
        ///     Saves a new article into the database.
        /// </summary>
        /// <param name="command">The data for the new article</param>
        /// <returns>The view model for the newly inserted article.</returns>
        [HttpPost]
        [Route("")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> PostNew([FromBody] CreateArticleCommand command)
        {
            var id = await _mediator.Send(command);
            return Ok(await _queries.GetArticleAsync(id));
        }

        [HttpPut]
        [Route("{articleId}")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> Update([FromRoute] int articleId, [FromBody] UpdateArticleCommand command)
        {
            if (command.Id != articleId)
            {
                return BadRequest("The ID of the article should remain the same");
            }

            var result = await _mediator.Send(command);
            if (result == false)
                return NotFound();

            return Ok(await _queries.GetArticleAsync(articleId));
        }

        /// <summary>
        ///     Archives the given article.
        /// </summary>
        /// <param name="articleId">The ID of the article to archive.</param>
        /// <returns><see cref="NoContentResult"/> on success.</returns>
        [HttpPatch]
        [Route("{articleId}/archive")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> Archive([FromRoute] int articleId)
        {
            var command = new ArchiveArticleCommand(articleId);
            var result = await _mediator.Send(command);
            if (result == false)
                return NotFound();
            return NoContent();
        }

        /// <summary>
        ///     Publishes the given article.
        /// </summary>
        /// <param name="articleId">The ID of the article to publish.</param>
        /// <returns><see cref="NoContentResult"/> on success.</returns>
        [HttpPatch]
        [Route("{articleId}/publish")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> Publish([FromRoute] int articleId)
        {
            var command = new PublishArticleCommand(articleId);
            var result = await _mediator.Send(command);
            if (result == false)
                return NotFound();
            return NoContent();
        }

    }

}