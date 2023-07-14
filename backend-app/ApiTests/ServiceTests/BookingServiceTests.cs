using ApiTests.TestFixtures;
using ApiTests.TestHelpers;
using HotelBookingSystem.API.Auth.Model;
using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Services.BookingService;
using Microsoft.Extensions.Logging;
using Moq;

namespace ApiTests.ServiceTests
{
    public class BookingServiceTests
    {
        private IBookingRepository _bookingRepository;
        private IBookingService _sut;

        [SetUp]
        public void Setup()
        {
            _bookingRepository = new BookingRepository(DatabaseTestFixture.SetupDatabase());
            _sut = new BookingService(_bookingRepository, new Mock<ILogger<BookingService>>().Object);
        }

        [Test]
        public void GetAllCustomerBookings_ReturnsNoBookings_IfWrongCustomer()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking existingBooking =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _bookingRepository.CreateBooking(existingBooking);

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
            _bookingRepository.CreateBooking(existingBooking1);
            bookingsExpected.Add(existingBooking1);

            Booking existingBooking2 =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 08, 15), new DateTime(2023, 08, 20));
            existingBooking2.CustomerId = existingBooking1.CustomerId;
            _bookingRepository.CreateBooking(existingBooking2);
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
            _bookingRepository.CreateBooking(bookingExpected);

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
            _bookingRepository.CreateBooking(bookingExpected);

            // Act
            Booking? bookingActual = _sut.GetBookingById(Guid.NewGuid());

            // Assert
            Assert.IsNull(bookingActual);
        }

        [Test]
        public void GetBookingById_ThrowsException_IfNotCorrectCustomerId()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking bookingExpected =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _bookingRepository.CreateBooking(bookingExpected);

            // Act and Assert
            void Act() => _sut.GetBookingById(bookingExpected.BookingId, Guid.NewGuid());

            // Assert
            Assert.Throws<BookingAccessException>(Act);
        }

        [Test]
        public void GetBookingById_ReturnsBooking_IfCorrectCustomerIdAndCorrectBookingId()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking bookingExpected =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _bookingRepository.CreateBooking(bookingExpected);

            // Act
            Booking? bookingActual = _sut.GetBookingById(bookingExpected.BookingId, bookingExpected.CustomerId);

            // Assert
            Assert.That(bookingActual, Is.EqualTo(bookingExpected));
        }

        [Test]
        public void RemoveBookingById_RemovesCorrectly_IfCorrectId()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking bookingExpected =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));
            _bookingRepository.CreateBooking(bookingExpected);

            // Act
            void Act() => _sut.RemoveBookingById(bookingExpected.BookingId);

            // Assert
            Assert.DoesNotThrow(Act);
            Assert.IsNull(_sut.GetBookingById(bookingExpected.BookingId));
        }

        [Test]
        public void CreateBooking_CreatesBooking_IfCorrectBookingData()
        {
            // Arrange
            var roomId = MockData.RoomsHardcoded.ElementAt(0).RoomId;

            Booking bookingExpected =
                BookingTestFixture.SetUpBooking(roomId, new DateTime(2023, 07, 15), new DateTime(2023, 07, 20));

            var currentCustomer = new Mock<ICurrentUser>();
            currentCustomer.SetupGet(c => c.Id).Returns(Guid.NewGuid().ToString());
            currentCustomer.SetupGet(c => c.FirstName).Returns("name");
            currentCustomer.SetupGet(c => c.LastName).Returns("surname");

            // Act
            var bookingActual = _sut.CreateBooking(bookingExpected, currentCustomer.Object);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(bookingActual.BookingIdentifierNumber, Is.Not.EqualTo(bookingExpected.BookingIdentifierNumber));
                Assert.That(bookingActual.BookingId, Is.Not.EqualTo(bookingExpected.BookingId));
                Assert.That(bookingActual.CustomerId.ToString(), Is.EqualTo(currentCustomer.Object.Id));
                Assert.That(bookingActual.CustomerFirstName, Is.EqualTo(currentCustomer.Object.FirstName));
                Assert.That(bookingActual.CustomerLastName, Is.EqualTo(currentCustomer.Object.LastName));
            });
        }
    }
}
