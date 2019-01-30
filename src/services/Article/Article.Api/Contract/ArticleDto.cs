using System;

namespace Article.Api.Contract
{
    public class ArticleDto
    {
        public int Id { get; set; }

        public DateTimeOffset? PublishTime { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
    }
}