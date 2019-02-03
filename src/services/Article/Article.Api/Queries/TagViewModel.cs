namespace MarcellTothNet.Services.Article.Api.Queries
{
    /// <summary>
    ///     View model of a tag. This is the result type that will be exposed to API clients.
    /// </summary>
    public class TagViewModel
    {
        /// <summary>
        ///     The internal unique ID of the tag.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        ///     The display name of the tag.
        /// </summary>
        public string DisplayName { get; set; }
    }
}