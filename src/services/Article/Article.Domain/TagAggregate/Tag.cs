using MarcellTothNet.Common.DDDFoundations;

namespace MarcellTothNet.Services.Article.Domain.TagAggregate
{
    /// <summary>
    ///     Represents an article-tag.
    /// </summary>
    /// <remarks>
    ///     In the future this is planned to have a Size property that is derived from the number of attached articled (via Domain Events).
    /// </remarks>
    public class Tag : Entity<int>, IAggregateRoot
    {
        private string _displayName;

        public Tag(string displayName)
        {
            if (string.IsNullOrWhiteSpace(displayName))
                ThrowForEmptyDisplayName();

            _displayName = displayName;
        }

        /// <summary>
        ///     The display name of the tag, such as "C#" / "WPF"
        /// </summary>
        public string DisplayName
        {
            get => _displayName;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    ThrowForEmptyDisplayName();
                _displayName = value;
            }
        }



        private static void ThrowForEmptyDisplayName()
        {
            throw new ArticleDomainException("Tags cannot have NULL or empty displaynames");
        }
    }
}