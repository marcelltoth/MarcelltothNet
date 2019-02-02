using System.Threading.Tasks;
using MarcellTothNet.Common.DDDFoundations;

namespace MarcellTothNet.Services.Article.Domain.TagAggregate
{
    public interface ITagRepository : IRepository<Tag>
    {
        /// <summary>
        ///     Fetches an Tag aggregate by it's ID, and starts tracking it in the <see cref="IRepository{Tag}.UnitOfWork"/>.
        /// </summary>
        /// <param name="tagId">The ID of the tag to load.</param>
        /// <returns>The root of the aggregate.</returns>
        Task<Tag> GetByIdAsync(int tagId);

        /// <summary>
        ///     Adds a new Tag aggregate to the <see cref="IRepository{Tag}.UnitOfWork"/> and starts tracking its changes.
        /// </summary>
        /// <param name="tag">The root of the aggregate to be added.</param>
        void Add(Tag tag);

        /// <summary>
        ///     Deletes an Tag aggregate and its dependents from the storage.
        /// </summary>
        /// <param name="tag">The root of the aggregate to remove.</param>
        void Delete(Tag tag);
    }
}