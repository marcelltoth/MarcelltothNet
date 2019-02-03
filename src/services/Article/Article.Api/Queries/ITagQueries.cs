using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarcellTothNet.Services.Article.Api.Queries
{
    /// <summary>
    ///     Query object on the article tags collection. Returns <see cref="TagViewModel"/>s.
    /// </summary>
    public interface ITagQueries
    {
        /// <summary>
        ///     Returns a list of all tags in the system.
        /// </summary>
        Task<IEnumerable<TagViewModel>> GetAllTagsAsync();

        /// <summary>
        ///     Fetches a certain tag by its id.
        /// </summary>
        /// <param name="id">The ID of the tag to fetch.</param>
        /// <returns>A <see cref="TagViewModel"/> on success, null if not found.</returns>
        Task<TagViewModel> GetTagByIdAsnyc(int id);
    }
}