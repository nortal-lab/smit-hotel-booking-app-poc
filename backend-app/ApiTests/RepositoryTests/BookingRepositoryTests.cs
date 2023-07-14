using ApiTests.TestFixtures;
using ApiTests.TestHelpers;
using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Helpers;
using HotelBookingSystem.API.Models;

namespace ApiTests.RepositoryTests
{
    public class BookingRepositoryTests
    {
        private IBookingRepository _sut;

        [SetUp]
        public void Setup()
        {
            _sut = new BookingRepository(DatabaseTestFixture.SetupDatabase());
        }

        [Test]
        public void IsBookingDateAvailable_IsAvailable_IfNoOverlappingBookings()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking existingBooking =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBooking);

            Booking bookingToCheck =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 10), new DateTime(2023, 07, 12));

            // Act
            bool isAvailableActual = _sut.IsBookingDateAvailable(bookingToCheck);

            // Assert
            Assert.IsTrue(isAvailableActual);
        }

        [Test]
        public void IsBookingDateAvailable_IsNotAvailable_IfOverlapsWithExistingBookingStart()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking existingBooking =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBooking);

            Booking bookingToCheck =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 10), new DateTime(2023, 07, 17));

            // Act
            bool isAvailableActual = _sut.IsBookingDateAvailable(bookingToCheck);

            // Assert
            Assert.IsFalse(isAvailableActual);
        }

        [Test]
        public void IsBookingDateAvailable_IsNotAvailable_IfOverlapsWithExistingBookingEnd()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking existingBooking =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBooking);

            Booking bookingToCheck =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 18), new DateTime(2023, 07, 22));

            // Act
            bool isAvailableActual = _sut.IsBookingDateAvailable(bookingToCheck);

            // Assert
            Assert.IsFalse(isAvailableActual);
        }

        [Test]
        public void IsBookingDateAvailable_IsNotAvailable_IfIsWithinExistingBookingDate()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking existingBooking =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBooking);

            Booking bookingToCheck =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 16), new DateTime(2023, 07, 18));

            // Act
            bool isAvailableActual = _sut.IsBookingDateAvailable(bookingToCheck);

            // Assert
            Assert.IsFalse(isAvailableActual);
        }

        [Test]
        public void IsBookingDateAvailable_IsAvailable_InBetweenTwoBookings()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking existingBookingLeftSide =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBookingLeftSide);

            Booking existingBookingRightSide =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 01), new DateTime(2023, 07, 10));
            _sut.CreateBooking(existingBookingRightSide);

            Booking bookingToCheck =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 11), new DateTime(2023, 07, 12));

            // Act
            bool isAvailableActual = _sut.IsBookingDateAvailable(bookingToCheck);

            // Assert
            Assert.IsTrue(isAvailableActual);
        }

        [Test]
        public void GetAllCustomerBookings_ReturnsNoBookings_IfWrongCustomer()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking existingBooking =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBooking);

            // Act
            List<Booking> bookingsActual = _sut.GetAllCustomerBookings(Guid.NewGuid());

            // Assert
            Assert.IsEmpty(bookingsActual);
        }

        [Test]
        public void GetAllCustomerBookings_ReturnsAllBookings_IfCorrectCustomer()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            var bookingsExpected = new List<Booking>();
            Booking existingBooking1 =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBooking1);
            bookingsExpected.Add(existingBooking1);

            Booking existingBooking2 =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 08, 15), new DateTime(2023, 08, 20));
            existingBooking2.CustomerId = existingBooking1.CustomerId;
            _sut.CreateBooking(existingBooking2);
            bookingsExpected.Add(existingBooking2);

            // Act
            List<Booking> bookingsActual = _sut.GetAllCustomerBookings(existingBooking1.CustomerId);

            // Assert
            CollectionAssert.AreEqual(bookingsExpected, bookingsActual);
        }

        [Test]
        public void GetBookingById_ReturnsBooking_IfCorrectBookingId()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking bookingExpected =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(bookingExpected);
            
            // Act
            Booking? bookingActual = _sut.GetBookingById(bookingExpected.BookingId);

            // Assert
            Assert.That(bookingActual, Is.EqualTo(bookingExpected));
        }

        [Test]
        public void GetBookingById_ReturnsNothing_IfNotCorrectBookingId()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking bookingExpected =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(bookingExpected);

            // Act
            Booking? bookingActual = _sut.GetBookingById(Guid.NewGuid());

            // Assert
            Assert.IsNull(bookingActual);
        }

        [Test]
        public void RemoveBookingById_RemovesCorrectly_IfCorrectId()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking bookingExpected =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(bookingExpected);


            // Act
            bool isRemoved = _sut.RemoveBookingById(bookingExpected.BookingId);

            // Assert
            Assert.IsTrue(isRemoved);
        }

        [Test]
        public void RemoveBookingById_RemovesNothing_IfNotCorrectId()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking bookingExpected =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(bookingExpected);


            // Act
            bool isRemoved = _sut.RemoveBookingById(Guid.NewGuid());

            // Assert
            Assert.IsFalse(isRemoved);
        }

        [Test]
        public void FindAllActiveBookings_FindTwoActiveBookings_IfTwoActiveAndOneExpiredExists()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            List<Booking> activeBookingsExpected = new();
            Booking activeBooking1 =
                BookingTestFixture.SetUpBooking(roomId, DateTime.Now.AddDays(1), DateTime.Now.AddDays(10));
            _sut.CreateBooking(activeBooking1);
            activeBookingsExpected.Add(activeBooking1);

            Booking activeBooking2 =
                BookingTestFixture.SetUpBooking(roomId, DateTime.Now.AddDays(1), DateTime.Now.AddDays(10));
            _sut.CreateBooking(activeBooking2);
            activeBookingsExpected.Add(activeBooking2);

            Booking expiredBooking =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2006, 07, 15), new DateTime(2006, 07, 20));
            _sut.CreateBooking(expiredBooking);

            // Act
            List<Booking> activeBookingsActual = _sut.FindAllActiveBookings();

            // Assert
            CollectionAssert.AreEqual(activeBookingsExpected, activeBookingsActual);
        }
    }
}
