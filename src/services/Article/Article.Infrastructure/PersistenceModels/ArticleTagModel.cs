using MarcellTothNet.Services.Article.Domain.TagAggregate;

namespace MarcellTothNet.Services.Article.Infrastructure.PersistenceModels
{
    /// <summary>
    ///     Artifical mapping type for the n-to-n relationship between Articles and Tags.
    /// </summary>
    public class ArticleTagModel
    {
        public int ArticleId { get; set; }

        public int TagId { get; set; }

        public ArticleModel Article { get; set; }

        public Tag Tag { get; set; }
    }
}