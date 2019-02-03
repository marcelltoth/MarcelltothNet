using MediatR;
using Newtonsoft.Json;

namespace MarcellTothNet.Services.Article.Api.Commands
{
    /// <summary>
    ///     Command to archive a given tag.
    ///     Returns true on success, false if not found.
    /// </summary>
    public class ArchiveTagCommand : IRequest<bool>
    {
        [JsonConstructor]
        public ArchiveTagCommand(int tagId)
        {
            TagId = tagId;
        }

        public int TagId { get; }
    }
}