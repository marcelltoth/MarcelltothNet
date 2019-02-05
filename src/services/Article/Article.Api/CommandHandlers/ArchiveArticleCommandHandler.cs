using System.Threading;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Api.Commands;
using MarcellTothNet.Services.Article.Domain.ArticleAggregate;
using MediatR;

namespace MarcellTothNet.Services.Article.Api.CommandHandlers
{
    public class ArchiveArticleCommandHandler : IRequestHandler<ArchiveArticleCommand, bool>
    {
        private readonly IArticleRepository _repository;

        public ArchiveArticleCommandHandler(IArticleRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(ArchiveArticleCommand request, CancellationToken cancellationToken)
        {
            var article = await _repository.GetByIdAsync(request.ArticleId);

            if (article == null)
                return false;

            article.Archive();
            
            await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
            return true;

        }
    }
}