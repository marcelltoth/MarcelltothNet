namespace MarcellTothNet.Common.DDDFoundations
{
    /// <summary>
    ///     A Repository that is responsible for CRUD operations over the Aggregate <typeparamref name="TEntity"/>.
    ///     Works on a <see cref="IUnitOfWork"/> that is usually provided via constructor injection.
    /// </summary>
    /// <typeparam name="TEntity">The Aggregate Root over this repository operates.</typeparam>
    /// <remarks>
    ///     Repository interfaces should derive from this, adding methods that are required for their domains.
    /// </remarks>
    public interface IRepository<TEntity> where TEntity : IAggregateRoot
    {
        /// <summary>
        ///     The <see cref="IUnitOfWork"/> over which this repository works.
        /// </summary>
        IUnitOfWork UnitOfWork { get; }
    }
}