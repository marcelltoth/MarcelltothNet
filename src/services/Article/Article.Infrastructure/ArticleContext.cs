using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using MarcellToth.DDDBuildingBlocks.Persistence.Abstractions;
using MarcellTothNet.Services.Article.Domain.TagAggregate;
using MarcellTothNet.Services.Article.Infrastructure.PersistenceModels;
using Microsoft.EntityFrameworkCore;

namespace MarcellTothNet.Services.Article.Infrastructure
{
    public class ArticleContext : DbContext, IUnitOfWork
    {
        public ArticleContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ArticleModel> ArticleModels { get; set; }

        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public Task SaveEntitiesAsync(CancellationToken ct = default)
        {
            return SaveChangesAsync(ct);
        }
    }
}