using MediatR;
using Newtonsoft.Json;

namespace MarcellTothNet.Services.Article.Api.Commands
{
    /// <summary>
    ///     Commands a change in the DisplayName property of a Tag.
    ///     Returns true on success, false if not found.
    /// </summary>
    public class ChangeTagDisplayNameCommand : IRequest<bool>
    {
        [JsonConstructor]
        public ChangeTagDisplayNameCommand(int tagId, string newDisplayName)
        {
            TagId = tagId;
            NewDisplayName = newDisplayName;
        }

        public int TagId { get; }

        public string NewDisplayName { get; }
    }
}