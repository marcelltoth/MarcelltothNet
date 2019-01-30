using System;
using System.Collections.Generic;

namespace Article.Api.Models
{
    public class Article
    {
        public int Id { get; set; }

        public DateTimeOffset? PublishTime { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public IList<ArticleTag> ArticleTags { get; set; }
    }
}