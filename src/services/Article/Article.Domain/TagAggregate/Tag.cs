using MarcellTothNet.Common.DDDFoundations;

namespace MarcellTothNet.Article.Domain.TagAggregate
{
    /// <summary>
    ///     Represents an article-tag.
    /// </summary>
    /// <remarks>
    ///     In the future this is planned to have a Size property that is derived from the number of attached articled (via Domain Events).
    /// </remarks>
    public class Tag : Entity<int>, IAggregateRoot
    {
        public string DisplayName { get; set; }
    }
}