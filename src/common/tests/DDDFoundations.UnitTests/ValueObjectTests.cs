using System;
using System.Collections.Generic;
using Xunit;

namespace MarcellTothNet.Common.DDDFoundations.UnitTests
{
    /// <summary>
    ///     Class to test the logic in the <see cref="ValueObject"/> base class, mostly Equality.
    /// </summary>
    public class ValueObjectTests
    {
        /// <summary>
        ///     A test value object that has two properties, an int and a string.
        /// </summary>
        private class TestValueObject : ValueObject
        {
            public int Prop1 { get; }

            public string Prop2 { get; }

            public TestValueObject(int prop1, string prop2)
            {
                Prop1 = prop1;
                Prop2 = prop2;
            }

            protected override IEnumerable<object> GetAtomicValues()
            {
                yield return Prop1;
                yield return Prop2;
            }
        }
        

        #region IEquatable Tests

        /// <summary>
        ///     Test that the <see cref="IEquatable{ValueObject}"/> implementation returns false when the argument is null.
        /// </summary>
        [Fact]
        public void IEquatable_OtherIsNull_NotEqual()
        {
            TestValueObject obj1 = new TestValueObject(1, "hello");
            Assert.False(obj1.Equals((ValueObject)null));
        }

        /// <summary>
        ///     Test that the <see cref="IEquatable{ValueObject}"/> implementation returns true when the argument is the same object.
        /// </summary>
        [Fact]
        public void IEquatable_OtherIsSame_Equal()
        {
            TestValueObject obj1 = new TestValueObject(1, "hello");
            Assert.True(obj1.Equals(obj1));
        }

        /// <summary>
        ///     Test that the <see cref="IEquatable{ValueObject}"/> implementation returns true when the argument is an equivalent (although not reference-equal) object.
        /// </summary>
        [Fact]
        public void IEquatable_OtherIsEqual_Equal()
        {
            TestValueObject obj1 = new TestValueObject(1, "hello");
            TestValueObject obj2 = new TestValueObject(1, "hello");
            Assert.True(obj1.Equals(obj2));
        }

        /// <summary>
        ///     Test that the <see cref="IEquatable{ValueObject}"/> implementation returns false when the argument is a different object.
        /// </summary>
        [Fact]
        public void IEquatable_OtherIsDifferent_Equal()
        {
            TestValueObject obj1 = new TestValueObject(1, "hello");
            TestValueObject obj2 = new TestValueObject(2, "hello");
            TestValueObject obj3 = new TestValueObject(1, "hello2");
            Assert.False(obj1.Equals(obj2));
            Assert.False(obj1.Equals(obj3));
        }

        #endregion

        #region Object.Equals Tests

        /// <summary>
        ///     Test that the <see cref="object.Equals(object)"/> override returns false when the argument is null.
        /// </summary>
        [Fact]
        public void ObjectEquals_OtherIsNull_NotEqual()
        {
            TestValueObject obj1 = new TestValueObject(1, "hello");
            Assert.False(obj1.Equals((object)null));
        }

        /// <summary>
        ///     Test that the <see cref="object.Equals(object)"/> override returns true when the argument is the same object.
        /// </summary>
        [Fact]
        public void ObjectEquals_OtherIsSame_Equal()
        {
            TestValueObject obj1 = new TestValueObject(1, "hello");
            Assert.True(obj1.Equals((object)obj1));
        }

        /// <summary>
        ///     Test that the <see cref="object.Equals(object)"/> override returns true when the argument is an equivalent (although not reference-equal) object.
        /// </summary>
        [Fact]
        public void ObjectEquals_OtherIsEqual_Equal()
        {
            TestValueObject obj1 = new TestValueObject(1, "hello");
            TestValueObject obj2 = new TestValueObject(1, "hello");
            Assert.True(obj1.Equals((object)obj2));
        }

        /// <summary>
        ///     Test that the <see cref="object.Equals(object)"/> override returns false when the argument is a different object.
        /// </summary>
        [Fact]
        public void ObjectEquals_OtherIsDifferent_Equal()
        {
            TestValueObject obj1 = new TestValueObject(1, "hello");
            TestValueObject obj2 = new TestValueObject(2, "hello");
            TestValueObject obj3 = new TestValueObject(1, "hello2");
            Assert.False(obj1.Equals((object)obj2));
            Assert.False(obj1.Equals((object)obj3));
        }

        #endregion

    }
}