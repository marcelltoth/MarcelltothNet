using System.Threading;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Api.Commands;
using MarcellTothNet.Services.Article.Domain.TagAggregate;
using MediatR;

namespace MarcellTothNet.Services.Article.Api.CommandHandlers
{
    public class ArchiveTagCommandHandler : IRequestHandler<ArchiveTagCommand, bool>
    {
        private readonly ITagRepository _tagRepository;

        public ArchiveTagCommandHandler(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public async Task<bool> Handle(ArchiveTagCommand request, CancellationToken cancellationToken)
        {
            var tag = await _tagRepository.GetByIdAsync(request.TagId);
            if (tag == null)
                return false;

            tag.Archive();

            await _tagRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
            return true;
        }
    }
}