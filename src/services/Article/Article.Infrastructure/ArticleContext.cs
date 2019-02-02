using System.Threading;
using System.Threading.Tasks;
using MarcellTothNet.Common.DDDFoundations;
using Microsoft.EntityFrameworkCore;

namespace MarcellTothNet.Services.Article.Infrastructure
{
    public class ArticleContext : DbContext, IUnitOfWork
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public Task SaveEntitiesAsync(CancellationToken ct = default)
        {
            return SaveChangesAsync(ct);
        }
    }
}