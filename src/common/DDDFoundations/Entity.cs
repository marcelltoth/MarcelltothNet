using System;
using System.Collections.Generic;

namespace MarcellTothNet.Common.DDDFoundations
{
    /// <summary>
    ///     Convenience base class for all DDD Entity objects. Implements the Id property, and overrides <see cref="Equals"/> based on it.
    /// </summary>
    /// <typeparam name="TIdentifier">The type of the <see cref="Id"/> property.</typeparam>
    public class Entity<TIdentifier>
        where TIdentifier : struct
    {
        private static readonly IEqualityComparer<TIdentifier> _equalityComparer = EqualityComparer<TIdentifier>.Default;
        private static bool CompareIdentifiers(TIdentifier a, TIdentifier b) => _equalityComparer.Equals(a, b);


        private readonly Lazy<int> _hashCode;

        public TIdentifier Id { get; set; }

        public bool IsTransient => CompareIdentifiers(Id, default);

        public Entity()
        {
            _hashCode = new Lazy<int>(() => Id.GetHashCode() ^ 31);
        }

        public override bool Equals(object obj)
        {
            if (!(obj is Entity<TIdentifier> otherEntity))
                return false;

            if (ReferenceEquals(this, obj))
                return true;

            if (GetType() != obj.GetType())
                return false;
            

            if (otherEntity.IsTransient || IsTransient)
                return false;
            else
                return CompareIdentifiers(otherEntity.Id, Id);
        }

        public override int GetHashCode()
        {
            if (!IsTransient)
            {
                return _hashCode.Value;
            }
            // ReSharper disable once BaseObjectGetHashCodeCallInGetHashCode
            return base.GetHashCode();
        }
    }
}