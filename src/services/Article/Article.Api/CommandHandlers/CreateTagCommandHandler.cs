using System.Threading;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Api.Commands;
using MarcellTothNet.Services.Article.Domain.TagAggregate;
using MediatR;

namespace MarcellTothNet.Services.Article.Api.CommandHandlers
{
    public class CreateTagCommandHandler : IRequestHandler<CreateTagCommand, int>
    {
        private readonly ITagRepository _tagRepository;

        public CreateTagCommandHandler(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public async Task<int> Handle(CreateTagCommand request, CancellationToken cancellationToken)
        {
            Tag tagToInsert = new Tag(request.DisplayName);

            _tagRepository.Add(tagToInsert);
            await _tagRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
            return tagToInsert.Id;
        }
    }
}