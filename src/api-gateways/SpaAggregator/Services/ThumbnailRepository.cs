using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using SpaAggregator.Models;

namespace SpaAggregator.Services
{
    public class ThumbnailRepository
    {
        private readonly IMemoryCache _cache;

        public ThumbnailRepository(IMemoryCache cache)
        {
            _cache = cache;
        }

        /// <summary>
        ///     Returns the thumbnail image for a source.
        /// </summary>
        /// <param name="source">Either a Data URI or a HTTP URL pointing to an image.</param>
        /// <param name="targetWidth">The max width of the thumbnail.</param>
        /// <param name="targetHeight">The max height of the thumbnail.</param>
        /// <remarks>
        ///     The case when <paramref name="source"/> is an external (HTTP) URL is not implemented
        /// </remarks>
        public async Task<ThumbnailImage> GetAsync(string source, int targetWidth, int targetHeight)
        {
            if (!source.StartsWith("data"))
                throw new NotImplementedException($"{nameof(source)} must be a Data URI");

            if (targetWidth < 10)
                throw new ArgumentOutOfRangeException(nameof(targetWidth));
            if (targetHeight < 10)
                throw new ArgumentOutOfRangeException(nameof(targetHeight));

            CacheKey key = new CacheKey(source, targetWidth, targetHeight);

            ThumbnailImage item = await _cache.GetOrCreateAsync(key, c =>
            {
                c.SlidingExpiration = TimeSpan.FromDays(1);
                return Task.Run(() =>
                {
                    ThumbnailImage image = ThumbnailImage.FromDataUri(source);
                    image.Resize(targetWidth, targetHeight);
                    return image;
                });
            });

            return item;
        }

        private struct CacheKey : IEquatable<CacheKey>
        {
            public string Source { get; }

            public int TargetWidth { get; }

            public int TargetHeight { get; }

            public CacheKey(string source, int targetWidth, int targetHeight)
            {
                Source = source;
                TargetWidth = targetWidth;
                TargetHeight = targetHeight;
            }

            public bool Equals(CacheKey other)
            {
                return string.Equals(Source, other.Source) && TargetWidth == other.TargetWidth && TargetHeight == other.TargetHeight;
            }

            public override bool Equals(object obj)
            {
                if (ReferenceEquals(null, obj)) return false;
                return obj is CacheKey other && Equals(other);
            }

            public override int GetHashCode()
            {
                unchecked
                {
                    var hashCode = Source.GetHashCode();
                    hashCode = (hashCode * 397) ^ TargetWidth;
                    hashCode = (hashCode * 397) ^ TargetHeight;
                    return hashCode;
                }
            }
        }
    }
}