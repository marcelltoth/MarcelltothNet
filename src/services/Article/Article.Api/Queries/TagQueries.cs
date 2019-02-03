using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using Dapper;

namespace MarcellTothNet.Services.Article.Api.Queries
{
    /// <inheritdoc cref="ITagQueries" />
    public class TagQueries : QueriesBase, ITagQueries
    {
        public TagQueries(Func<DbConnection> sqlConnectionFactory) : base(sqlConnectionFactory)
        {
        }

        public async Task<IEnumerable<TagViewModel>> GetAllTagsAsync(bool includeArchived)
        {
            using (var connection = await CreateAndOpenDbConnectionAsync())
            {
                if (includeArchived)
                {
                    return await connection.QueryAsync<TagViewModel>("SELECT [Id], [DisplayName] FROM [Tags] ORDER BY [Id]");
                }
                else
                {
                    return await connection.QueryAsync<TagViewModel>("SELECT [Id], [DisplayName] FROM [Tags] WHERE [IsArchived] = 0 ORDER BY [Id]");
                }
            }
        }

        public async Task<TagViewModel> GetTagByIdAsnyc(int id)
        {
            using (var connection = await CreateAndOpenDbConnectionAsync())
            {
                return await connection.QueryFirstOrDefaultAsync<TagViewModel>("SELECT [Id], [DisplayName] FROM [Tags] WHERE [ID] = @id", new {id});
            }
        }
    }
}