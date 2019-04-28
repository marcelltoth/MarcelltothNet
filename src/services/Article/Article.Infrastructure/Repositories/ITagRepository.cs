using MarcellToth.DDDBuildingBlocks.Persistence.Abstractions;
using MarcellTothNet.Services.Article.Domain.TagAggregate;

namespace MarcellTothNet.Services.Article.Infrastructure.Repositories
{
    /// <inheritdoc />
    public interface ITagRepository : ICrudRepository<Tag, int>
    {
    }
}