using System;
using Microsoft.AspNetCore.Mvc;


namespace MarcellTothNet.Services.Article.Api.Controllers
{
    [Route("api/v1/articles")]
    public class ArticleController : Controller
    {

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            throw new NotImplementedException();
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