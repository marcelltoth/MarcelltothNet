using System.Threading.Tasks;
using MarcellTothNet.Common.DDDFoundations;
using MarcellTothNet.Services.Article.Domain.TagAggregate;

namespace MarcellTothNet.Services.Article.Infrastructure.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly ArticleContext _dbContext;

        public TagRepository(ArticleContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IUnitOfWork UnitOfWork => _dbContext;


        public Task<Tag> GetByIdAsync(int tagId)
        {
            return _dbContext.Tags.FindAsync(tagId);
        }

        public void Add(Tag tag)
        {
            _dbContext.Add(tag);
        }

        public void Delete(Tag tag)
        {
            _dbContext.Remove(tag);
        }
    }
}