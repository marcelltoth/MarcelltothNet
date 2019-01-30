using System;
using Microsoft.AspNetCore.Mvc;

using ArticleContext = MarcellTothNet.Services.Article.Api.Models.ArticleContext;

namespace MarcellTothNet.Services.Article.Api.Controllers
{
    [Route("api/v1/articles")]
    public class ArticleController : Controller
    {
        private readonly ArticleContext _dbContext;

        public ArticleController(ArticleContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            throw new NotImplementedException();
        }
    }


}