using System.Collections.Generic;
using SpaAggregator.Models;

namespace SpaAggregator.DataTransfer
{
    public class BasicDataDto
    {
        public IEnumerable<Tag> Tags { get; set; }

        public IEnumerable<Article> Articles { get; set; }
    }
}