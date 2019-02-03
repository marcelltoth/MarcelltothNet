using System;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Api.Commands;
using MarcellTothNet.Services.Article.Api.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MarcellTothNet.Services.Article.Api.Controllers
{
    /// <summary>
    ///     Provides API access to the collection of article tags.
    /// </summary>
    [Route("api/v1/tags")]
    public class TagsController : Controller
    {
        private readonly IMediator _mediator;
        private readonly ITagQueries _queries;

        public TagsController(IMediator mediator, ITagQueries queries)
        {
            _mediator = mediator;
            _queries = queries;
        }

        /// <summary>
        ///     Returns all article tags in the system.
        /// </summary>
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _queries.GetAllTagsAsync());
        }

        /// <summary>
        ///     Posts a new tag to the system.
        ///     Returns the newly created tag object.
        /// </summary>
        /// <param name="command">The data for the tag to create.</param>
        [HttpPost]
        [Route("")]
        public async Task<IActionResult> PostNew([FromBody] CreateTagCommand command)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var id = await _mediator.Send(command);
            return Ok(await _queries.GetTagByIdAsnyc(id));
        }


        [HttpPut]
        [Route("{tagId}/display_name")]
        public async Task<IActionResult> ReplaceDisplayName([FromRoute] int tagId, [FromBody] string newDisplayName)
        {
            if (tagId == default)
                return BadRequest();

            var command = new ChangeTagDisplayNameCommand(tagId, newDisplayName);
            bool commandResult = await _mediator.Send(command);

            return commandResult 
                ? Ok(await _queries.GetTagByIdAsnyc(tagId))
                : (IActionResult) NotFound();
        }

        [HttpDelete]
        [Route("{tagId}")]
        public async Task<IActionResult> Archive([FromRoute] int tagId)
        {
            if (tagId == default)
                return BadRequest();

            var command = new ArchiveTagCommand(tagId);
            bool commandResult = await _mediator.Send(command);

            return commandResult
                ? NoContent()
                : (IActionResult)NotFound();
        }
    }
}