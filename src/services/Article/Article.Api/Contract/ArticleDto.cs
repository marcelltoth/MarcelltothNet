using System;
using System.Collections.Generic;

namespace MarcellTothNet.Services.Article.Api.Contract
{
    public class ArticleDto
    {
        public int Id { get; set; }

        public DateTimeOffset? PublishTime { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public IList<int> Tags { get; set; } = new List<int>();
    }
}