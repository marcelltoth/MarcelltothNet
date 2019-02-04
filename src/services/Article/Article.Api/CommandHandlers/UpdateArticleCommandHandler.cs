using System;
using System.Threading;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Api.Commands;
using MarcellTothNet.Services.Article.Domain.ArticleAggregate;
using MediatR;

namespace MarcellTothNet.Services.Article.Api.CommandHandlers
{
    public class UpdateArticleCommandHandler : IRequestHandler<UpdateArticleCommand, bool>
    {
        private readonly IArticleRepository _repository;

        public UpdateArticleCommandHandler(IArticleRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(UpdateArticleCommand request, CancellationToken ct)
        {
            var article = await _repository.GetByIdAsync(request.Id);
            if (article == null)
                return false;

            article.Content = request.Content;
            article.PublishTime = request.PublishDate;
            article.Title = request.Title;
            article.Thumbnail = new ImageReference(new Uri(request.ThumbnailLocation), request.ThumbnailAltText);
            article.ReplaceTagIds(request.TagIds);
            
            _repository.Update(article);
            await _repository.UnitOfWork.SaveEntitiesAsync(ct);
            return true;
        }
    }
}