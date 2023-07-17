using Moq;
using HotelBookingSystem.API.Controllers.Employee;
using HotelBookingSystem.API.Services.BookingService;
using HotelBookingSystem.API.Models;
using Microsoft.AspNetCore.Mvc;
using HotelBookingSystem.API.Validators.BookingValidator;
using Microsoft.Extensions.Logging;
using HotelBookingSystem.API.Exceptions;

namespace HotelBookingSystem.API.Tests.Controllers
{
    [TestFixture]
    public class EmployeeBookingControllerTests
    {
        private Mock<IBookingService> _bookingServiceMock;
        private Mock<IBookingValidator> _bookingValidatorMock;
        private Mock<ILogger<EmployeeBookingController>> _loggerMock;
        private EmployeeBookingController _controller;

        [SetUp]
        public void SetUp()
        {
            _bookingServiceMock = new Mock<IBookingService>();
            _bookingValidatorMock = new Mock<IBookingValidator>();
            _loggerMock = new Mock<ILogger<EmployeeBookingController>>();
            _controller = new EmployeeBookingController(_bookingServiceMock.Object, _bookingValidatorMock.Object, _loggerMock.Object);
        }

        [Test]
        public void FindAllActiveBookings_ReturnsOkResult_WithListOfBookings()
        {
            // Arrange
            var activeBookings = new List<Booking>() { new Booking(), new Booking() };
            _bookingServiceMock.Setup(x => x.FindAllActiveBookings()).Returns(activeBookings);

            // Act
            var result = _controller.FindAllActiveBookings();

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            Assert.That(okResult.Value, Is.EqualTo(activeBookings));
        }

        [Test]
        public void CancelBooking_ReturnsNoContentResult_WhenCancellationIsValid()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId)).Returns(new Booking());

            // Act
            var result = _controller.CancelBooking(bookingId);

            // Assert
            Assert.That(result, Is.TypeOf<NoContentResult>());
        }

        [Test]
        public void CancelBooking_ReturnsNotFound_WhenBookingDoesNotExist()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId)).Returns((Booking)null);

            // Act
            var result = _controller.CancelBooking(bookingId);

            // Assert
            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public void CancelBooking_ReturnsBadRequestResult_WhenLessThanThreeDaysLeftExceptionThrown()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId)).Returns(new Booking());
            _bookingValidatorMock.Setup(x => x.ValidateCancellation(It.IsAny<Booking>()))
                     .Throws(new LessThanThreeDaysLeftException("message"));

            // Act
            var result = _controller.CancelBooking(bookingId);

            // Assert
            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
        }

        [Test]
        public void CancelBooking_ReturnsStatusCodeResult_WhenBookingRemovalExceptionThrown()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId)).Returns(new Booking());
            _bookingValidatorMock.Setup(x => x.ValidateCancellation(It.IsAny<Booking>()));
            _bookingServiceMock.Setup(x => x.RemoveBookingById(bookingId)).Throws(new BookingRemovalException("message"));

            // Act
            var result = _controller.CancelBooking(bookingId);

            // Assert
            Assert.That(result, Is.TypeOf<ObjectResult>());
            var objectResult = result as ObjectResult;
            Assert.That(objectResult?.StatusCode, Is.EqualTo(500));
        }
    }
}
