using System.Threading;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Api.Commands;
using MarcellTothNet.Services.Article.Infrastructure.Repositories;
using MediatR;

namespace MarcellTothNet.Services.Article.Api.CommandHandlers
{
    public class ChangeTagDisplayNameCommandHandler : IRequestHandler<ChangeTagDisplayNameCommand, bool>
    {
        private readonly ITagRepository _tagRepository;

        public ChangeTagDisplayNameCommandHandler(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public async Task<bool> Handle(ChangeTagDisplayNameCommand request, CancellationToken cancellationToken)
        {
            var tag = await _tagRepository.GetByIdAsync(request.TagId);
            if (tag == null)
                return false;

            tag.DisplayName = request.NewDisplayName;

            await _tagRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
            return true;
        }
    }
}