using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using Dapper;

namespace MarcellTothNet.Services.Article.Api.Queries
{
    /// <inheritdoc />
    public class TagQueries : ITagQueries
    {
        private readonly Func<DbConnection> _sqlConnectionFactory;

        public TagQueries(Func<DbConnection> sqlConnectionFactory)
        {
            _sqlConnectionFactory = sqlConnectionFactory;
        }

        private async Task<DbConnection> CreateAndOpenDbConnectionAsync()
        {
            DbConnection connection = _sqlConnectionFactory();
            await connection.OpenAsync();
            return connection;
        }
        
        public async Task<IEnumerable<TagViewModel>> GetAllTagsAsync()
        {
            using (var connection = await CreateAndOpenDbConnectionAsync())
            {
                return await connection.QueryAsync<TagViewModel>("SELECT [Id], [DisplayName] FROM [Tags] ORDER BY [Id]");
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