using System;
using System.Data.Common;
using System.Threading.Tasks;

namespace MarcellTothNet.Services.Article.Api.Queries
{
    /// <summary>
    ///     Convenience base class for query object implementations.
    ///     Handles the management of opening database connections.
    /// </summary>
    public class QueriesBase
    {
        private readonly Func<DbConnection> _sqlConnectionFactory;

        public QueriesBase(Func<DbConnection> sqlConnectionFactory)
        {
            _sqlConnectionFactory = sqlConnectionFactory;
        }

        /// <summary>
        ///     Opens a database connection.
        /// </summary>
        /// <returns></returns>
        protected async Task<DbConnection> CreateAndOpenDbConnectionAsync()
        {
            DbConnection connection = _sqlConnectionFactory();
            await connection.OpenAsync();
            return connection;
        }
    }
}