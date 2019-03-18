using System;
using System.Text.RegularExpressions;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.Primitives;

namespace SpaAggregator.Models
{
    /// <summary>
    ///     Represents a thumbnail image. Takes a source, resizes it and outputs the result
    /// </summary>
    public sealed class ThumbnailImage : IDisposable
    {
        private readonly Image<Rgba32> _sourceImage;
        private Image<Rgba32> _outputImage;

        private ThumbnailImage(Image<Rgba32> sourceImage)
        {
            _sourceImage = sourceImage;
            _outputImage = sourceImage;
        }

        /// <summary>
        ///     Create a <see cref="ThumbnailImage"/> from a Data URI.
        /// </summary>
        public static ThumbnailImage FromDataUri(string uri)
        {
            var base64Data = Regex.Match(uri, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
            byte[] binData = Convert.FromBase64String(base64Data);
            return new ThumbnailImage(Image.Load(binData));
        }

        /// <summary>
        ///     Resizes this thumbnail to be at most <paramref name="targetWidth"/> wide and <paramref name="targetHeight"/> high, while keeping the aspect ratio.
        /// </summary>
        public void Resize(int targetWidth, int targetHeight)
        {
            if(_outputImage != _sourceImage)
                _outputImage?.Dispose();
            _outputImage = _sourceImage.Clone();
            _outputImage.Mutate(c => c.Resize(new ResizeOptions() {Mode = ResizeMode.Max, Size = new Size(targetWidth, targetHeight)}));
        }

        public string ToDataUri()
        {
            return _outputImage.ToBase64String(JpegFormat.Instance);
        }

        public void Dispose()
        {
            _sourceImage?.Dispose();
            _outputImage?.Dispose();
        }
    }
}