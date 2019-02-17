using System;
using System.Threading;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Api.Commands;
using MarcellTothNet.Services.Article.Domain.ArticleAggregate;
using MediatR;

namespace MarcellTothNet.Services.Article.Api.CommandHandlers
{
    public class CreateArticleCommandHandler : IRequestHandler<CreateArticleCommand, int>
    {
        private readonly IArticleRepository _repository;

        public CreateArticleCommandHandler(IArticleRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(CreateArticleCommand request, CancellationToken ct)
        {
            Domain.ArticleAggregate.Article article = new Domain.ArticleAggregate.Article(
                request.Title,
                request.PublishDate,
                request.Content, 
                new ImageReference(request.ThumbnailLocation, request.ThumbnailAltText),
                request.TagIds,
                false
                );

            _repository.Add(article);
            await _repository.UnitOfWork.SaveEntitiesAsync(ct);
            return article.Id;
        }
    }
}