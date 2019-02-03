using System;
using System.Collections.Generic;
using MediatR;

namespace MarcellTothNet.Services.Article.Api.Commands
{
    /// <summary>
    ///     Command to create a new article. Handler shall return the ID of the newly inserted article entity.
    /// </summary>
    public class CreateArticleCommand : UpdateArticleCommandBase, IRequest<int>
    {
        public CreateArticleCommand(string title, DateTimeOffset publishDate, string thumbnailLocation, string thumbnailAltText, string content, IEnumerable<int> tagIds) 
            : base(title, publishDate, thumbnailLocation, thumbnailAltText, content, tagIds)
        {
        }
    }
}