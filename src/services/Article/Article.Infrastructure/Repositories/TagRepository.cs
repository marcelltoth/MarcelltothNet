using System.Threading.Tasks;
using MarcellToth.DDDBuildingBlocks.Persistence.Abstractions;
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

        public Task AddAsync(Tag tag)
        {
            _dbContext.Add(tag);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(Tag entity)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteAsync(int entityId)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteAsync(Tag tag)
        {
            _dbContext.Remove(tag);
            return Task.CompletedTask;
        }
    }
}