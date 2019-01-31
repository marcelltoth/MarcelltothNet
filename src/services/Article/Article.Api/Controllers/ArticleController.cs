using System;
using System.Linq;
using AutoMapper;
using MarcellTothNet.Services.Article.Api.Contract;
using Microsoft.AspNetCore.Mvc;

using ArticleContext = MarcellTothNet.Services.Article.Api.Models.ArticleContext;

namespace MarcellTothNet.Services.Article.Api.Controllers
{
    [Route("api/v1/articles")]
    public class ArticleController : Controller
    {
        private readonly ArticleContext _dbContext;
        private readonly IMapper _mapper;

        public ArticleController(ArticleContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Ok(_dbContext.Articles.ToList().Select(_mapper.Map<ArticleDto>));
        }

        [HttpPost]
        [Route("")]
        public IActionResult PostNew([FromBody] ArticleDto dto)
        {
            var articleObject = _mapper.Map<Models.Article>(dto);
            articleObject.Id = 0;
            _dbContext.Articles.Add(articleObject);
            _dbContext.SaveChanges();
            return Ok(_mapper.Map<ArticleDto>(articleObject));
        }

        [HttpPut]
        [Route("{articleId}")]
        public IActionResult Replace([FromRoute] int articleId, [FromBody] ArticleDto dto)
        {
            if (articleId != dto.Id)
                return BadRequest("Request body contains a different resource ID than the resource URI");

            var articleObject = _dbContext.Articles.Find(articleId);
            if (articleObject == null)
                return NotFound();

            _mapper.Map(dto, articleObject);

            _dbContext.SaveChanges();

            return Ok(_mapper.Map<ArticleDto>(articleObject));
        }

        [HttpDelete]
        [Route("{articleId}")]
        public IActionResult Delete([FromRoute] int articleId)
        {
            var articleObject = _dbContext.Articles.Find(articleId);
            if (articleObject == null)
                return NotFound();

            _dbContext.Articles.Remove(articleObject);
            _dbContext.SaveChanges();

            return NoContent();
        }

    }


}