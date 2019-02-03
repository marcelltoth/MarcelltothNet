using MediatR;
using Newtonsoft.Json;

namespace MarcellTothNet.Services.Article.Api.Commands
{
    /// <summary>
    ///     Command to create a new Tag. Should return the ID of the new tag on success.
    /// </summary>
    public class CreateTagCommand : IRequest<int>
    {
        [JsonConstructor]
        public CreateTagCommand(string displayName)
        {
            DisplayName = displayName;
        }

        public string DisplayName { get; }
    }
}