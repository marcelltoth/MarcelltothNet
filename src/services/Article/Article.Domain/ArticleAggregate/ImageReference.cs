using System;
using System.Collections.Generic;
using MarcellTothNet.Common.DDDFoundations;

namespace MarcellTothNet.Services.Article.Domain.ArticleAggregate
{
    /// <summary>
    ///     Represents a reference to an image, along with miscellaneous data.
    /// </summary>
    public class ImageReference : ValueObject
    {
        public ImageReference(string location, string altText)
        {
            Location = location;
            AltText = altText;
        }

        /// <summary>
        ///     The location of the image. Can be an absolute or a relative Uri, or a Data URI.
        ///     If the image is external, use an absolute uri, if it is local, use a relative link.
        /// </summary>
        public string Location { get; }

        /// <summary>
        ///     The alternate text of the image. Used by screen readers.
        /// </summary>
        public string AltText { get; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Location;
            yield return AltText;
        }
    }
}