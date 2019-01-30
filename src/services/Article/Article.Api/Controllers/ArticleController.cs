using System;
using Microsoft.AspNetCore.Mvc;

using Article.Api.Models;

namespace Article.Api.Controllers
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