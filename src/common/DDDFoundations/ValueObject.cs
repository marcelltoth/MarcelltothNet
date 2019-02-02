using System;
using System.Collections.Generic;
using System.Linq;

namespace MarcellTothNet.Common.DDDFoundations
{
    /// <summary>
    ///     Convenience base class for DDD Value Objects.
    ///     Overrides Equals using a simple iterator abstract method.
    /// </summary>
    public abstract class ValueObject : IEquatable<ValueObject>
    {

        /// <summary>
        ///     This method supports the implementation of <see cref="Equals(object)"/> and <see cref="GetHashCode"/>.
        ///     The iterator should yield all the differentiating components of this value object in a stable order.
        /// </summary>
        protected abstract IEnumerable<object> GetAtomicValues();


        public bool Equals(ValueObject other)
        {
            if (other == null)
                return false;

            if (other.GetType() != GetType())
                return false;

            // pair up the atomic values (their order is defined to be stable) and compare them on by one.
            var valuePairs = GetAtomicValues().Zip(other.GetAtomicValues(), (ours, theirs) => (ours, theirs));
            foreach (var (ours, theirs) in valuePairs)
            {
                if (!Equals(ours, theirs))
                    return false;
            }

            return true;
        }

        public sealed override bool Equals(object obj)
        {
            if (obj == null || obj.GetType() != GetType())
                return false;

            return Equals((ValueObject) obj);
        }

        public sealed override int GetHashCode()
        {
            return GetAtomicValues()
                .Select(x => x != null ? x.GetHashCode() : 0)
                .Aggregate((x, y) => x ^ y);
        }
    }
}