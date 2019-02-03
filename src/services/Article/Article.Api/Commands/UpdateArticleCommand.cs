using System;
using System.Collections.Generic;
using MediatR;
using Newtonsoft.Json;

namespace MarcellTothNet.Services.Article.Api.Commands
{
    /// <summary>
    ///     Comman to update an existing article. Handler shall return true on success, false if not found. Domain exceptions should be bubbled up.
    /// </summary>
    public class UpdateArticleCommand : UpdateArticleCommandBase, IRequest<bool>
    {
        /// <summary>
        ///     The ID of the article.
        /// </summary>
        public int Id { get; }

        [JsonConstructor]
        public UpdateArticleCommand(int id, string title, DateTimeOffset publishDate, string thumbnailLocation, string thumbnailAltText, string content, IEnumerable<int> tagIds) 
            : base(title, publishDate, thumbnailLocation, thumbnailAltText, content, tagIds)
        {
            Id = id;
        }
    }
}