using MarcellTothNet.Services.Article.Domain;
using MarcellTothNet.Services.Article.Domain.TagAggregate;
using Xunit;

namespace MarcellTothNet.Services.Article.UnitTests.Domain
{
    public class TagAggregateTests
    {
        [Fact]
        public void Ctor_NullDisplayName_Throws()
        {
            Assert.ThrowsAny<ArticleDomainException>(() => new Tag(null));
        }

        [Fact]
        public void Ctor_WhitespaceDisplayName_Throws()
        {
            Assert.ThrowsAny<ArticleDomainException>(() => new Tag("    \t  "));
        }

        [Fact]
        public void Ctor_CorrectDisplayName_DoesNotThrow()
        {
            // ReSharper disable once ObjectCreationAsStatement
            new Tag("hello");
        }

        [Fact]
        public void SetDisplayName_NullDisplayName_Throws()
        {
            var tag = new Tag("asd");

            Assert.ThrowsAny<ArticleDomainException>(() => tag.DisplayName = null);
        }

        [Fact]
        public void SetDisplayName_WhitespaceDisplayName_Throws()
        {
            var tag = new Tag("asd");

            Assert.ThrowsAny<ArticleDomainException>(() => tag.DisplayName = "    \t  ");
        }

        [Fact]
        public void SetDisplayName_CorrectDisplayName_DoesNotThrow()
        {
            var tag = new Tag("asd");

            tag.DisplayName = "Hello";

            Assert.Equal("Hello", tag.DisplayName);
        }
    }
}