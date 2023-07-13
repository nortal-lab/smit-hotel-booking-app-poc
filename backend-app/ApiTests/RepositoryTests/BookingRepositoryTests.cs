using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace ApiTests.RepositoryTests
{
    public class BookingRepositoryTests
    {
        private IBookingRepository _sut;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<HotelBookingSystemDbContext>()
                .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
                .Options;
            _sut = new BookingRepository(new HotelBookingSystemDbContext(options));
        }

        [Test]
        public void IsBookingDateAvailable_IsAvailable_IfNoOverlappingBookings()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking existingBooking =
                SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBooking);

            Booking bookingToCheck =
                SetUpBooking(roomId, new DateTime(2023, 07, 10), new DateTime(2023, 07, 12));

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
                SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBooking);

            Booking bookingToCheck =
                SetUpBooking(roomId, new DateTime(2023, 07, 10), new DateTime(2023, 07, 17));

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
                SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBooking);

            Booking bookingToCheck =
                SetUpBooking(roomId, new DateTime(2023, 07, 18), new DateTime(2023, 07, 22));

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
                SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBooking);

            Booking bookingToCheck =
                SetUpBooking(roomId, new DateTime(2023, 07, 16), new DateTime(2023, 07, 18));

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
                SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _sut.CreateBooking(existingBookingLeftSide);

            Booking existingBookingRightSide =
                SetUpBooking(roomId, new DateTime(2023, 07, 01), new DateTime(2023, 07, 10));
            _sut.CreateBooking(existingBookingRightSide);

            Booking bookingToCheck =
                SetUpBooking(roomId, new DateTime(2023, 07, 11), new DateTime(2023, 07, 12));

            // Act
            bool isAvailableActual = _sut.IsBookingDateAvailable(bookingToCheck);

            // Assert
            Assert.IsTrue(isAvailableActual);
        }

        private static Booking SetUpBooking(Guid roomId, DateTime startDate, DateTime endDate)
        {
            return new Booking
            {
                RoomId = roomId, StartDate = startDate, EndDate = endDate, CustomerFirstName = "firstname",
                CustomerLastName = "lastname"
            };
        }
    }
}
