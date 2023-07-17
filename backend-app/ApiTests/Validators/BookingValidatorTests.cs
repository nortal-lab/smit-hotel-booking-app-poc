using NUnit.Framework;
using Moq;
using System;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Validators.BookingValidator;
using HotelBookingSystem.API.Exceptions;

namespace ApiTests.ValidatorTests
{
    [TestFixture]
    public class BookingValidatorTests
    {
        private Mock<IBookingRepository> _bookingRepositoryMock;
        private BookingValidator _sut;

        [SetUp]
        public void SetUp()
        {
            _bookingRepositoryMock = new Mock<IBookingRepository>();
            _sut = new BookingValidator(_bookingRepositoryMock.Object);
        }

        [Test]
        public void ValidateDoubleBooking_Throws_WhenBookingDateIsNotAvailable()
        {
            // Arrange
            var booking = new Booking();
            _bookingRepositoryMock.Setup(x => x.IsBookingDateAvailable(booking)).Returns(false);

            // Act & Assert
            Assert.Throws<BookingDateOverlapException>(() => _sut.ValidateDoubleBooking(booking));
        }

        [Test]
        public void ValidateCreation_Throws_WhenInvalidDateRange()
        {
            // Arrange
            var booking = new Booking
            {
                StartDate = DateTime.Now.AddDays(1),
                EndDate = DateTime.Now.AddDays(-1)
            };

            // Act & Assert
            Assert.Throws<InvalidDateRangeException>(() => _sut.ValidateCreation(booking));
        }

        [Test]
        public void ValidateCancellation_Throws_WhenLessThanThreeDaysLeftBeforeStart()
        {
            // Arrange
            var booking = new Booking
            {
                StartDate = DateTime.Now.AddDays(2)
            };

            // Act & Assert
            Assert.Throws<LessThanThreeDaysLeftException>(() => _sut.ValidateCancellation(booking));
        }

        [Test]
        public void BookingDateRangeValidation_Throws_WhenInvalidDateRange()
        {
            // Arrange
            var startDate = DateTime.Now.AddDays(1);
            var endDate = DateTime.Now.AddDays(-1);

            // Act & Assert
            Assert.Throws<InvalidDateRangeException>(() => _sut.BookingDateRangeValidation(startDate, endDate));
        }
    }
}
