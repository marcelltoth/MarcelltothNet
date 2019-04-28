using System.Threading;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Api.Commands;
using MarcellTothNet.Services.Article.Infrastructure.Repositories;
using MediatR;

namespace MarcellTothNet.Services.Article.Api.CommandHandlers
{
    public class PublishArticleCommandHandler : IRequestHandler<PublishArticleCommand, bool>
    {
        private readonly IArticleRepository _repository;

        public PublishArticleCommandHandler(IArticleRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(PublishArticleCommand request, CancellationToken cancellationToken)
        {
            var model = await _repository.GetByIdAsync(request.ArticleId);
            if (model == null)
                return false;

            model.Publish();

            await _repository.UpdateAsync(model);
            await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
            return true;
        }
    }
}