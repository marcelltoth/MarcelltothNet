using System;

namespace MarcellTothNet.Services.Article.Domain
{
    public class ArticleDomainException : Exception
    {
        public ArticleDomainException(string message) : base(message)
        {
        }

        public ArticleDomainException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}