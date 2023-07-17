using HotelBookingSystem.API.Auth;
using HotelBookingSystem.API.Auth.Model;
using HotelBookingSystem.API.Controllers.Customer;
using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Services.BookingService;
using HotelBookingSystem.API.Validators.BookingValidator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace ApiTests.ControllerTests
{
    public class CustomerBookingControllerTests
    {
        private Mock<IBookingService> _bookingServiceMock;
        private Mock<IAuthenticationService> _authServiceMock;
        private Mock<IBookingValidator> _bookingValidatorMock;
        private Mock<ILogger<CustomerBookingController>> _loggerMock;
        private Mock<ICurrentUser> _currentUserMock;
        private CustomerBookingController _sut;

        [SetUp]
        public void Setup()
        {
            _bookingServiceMock = new Mock<IBookingService>();
            _authServiceMock = new Mock<IAuthenticationService>();
            _bookingValidatorMock = new Mock<IBookingValidator>();
            _loggerMock = new Mock<ILogger<CustomerBookingController>>();
            _currentUserMock = new Mock<ICurrentUser>();
            _authServiceMock.Setup(auth => auth.CurrentUser).Returns(_currentUserMock.Object);
            _sut = new CustomerBookingController(_bookingServiceMock.Object, _authServiceMock.Object, _bookingValidatorMock.Object, _loggerMock.Object);
        }

        [Test]
        public void CreateBooking_ReturnsCreatedResult_WithBooking()
        {
            // Arrange
            var booking = new Booking();
            _currentUserMock.Setup(x => x.Id).Returns("TestUserID");
            _bookingServiceMock.Setup(x => x.CreateBooking(It.IsAny<Booking>(), It.IsAny<ICurrentUser>())).Returns(booking);

            // Act
            var result = _sut.CreateBooking(booking);

            // Assert
            Assert.IsInstanceOf<CreatedAtActionResult>(result);
            Assert.That((result as CreatedAtActionResult)?.Value, Is.EqualTo(booking));
        }

        [Test]
        public void CreateBooking_ReturnsBadRequestResult_WhenInvalidDateRangeExceptionThrown()
        {
            // Arrange
            var booking = new Booking();
            _bookingValidatorMock.Setup(x => x.ValidateCreation(It.IsAny<Booking>())).Throws(new InvalidDateRangeException("message"));

            // Act
            var result = _sut.CreateBooking(booking);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public void CreateBooking_ReturnsBadRequestResult_WhenBookingDateOverlapExceptionThrown()
        {
            // Arrange
            var booking = new Booking();
            _bookingValidatorMock.Setup(x => x.ValidateDoubleBooking(It.IsAny<Booking>())).Throws(new BookingDateOverlapException("message"));

            // Act
            var result = _sut.CreateBooking(booking);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public void CreateBooking_ReturnsBadRequestResult_WhenBookingCreationExceptionThrown()
        {
            // Arrange
            var booking = new Booking();
            _bookingServiceMock.Setup(x => x.CreateBooking(It.IsAny<Booking>(), It.IsAny<ICurrentUser>())).Throws(new BookingCreationException("message"));

            // Act
            var result = _sut.CreateBooking(booking);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public void CancelBooking_ReturnsNoContentResult_WhenSuccessful()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            var booking = new Booking();
            _currentUserMock.Setup(x => x.Id).Returns(Guid.NewGuid().ToString());
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId, It.IsAny<Guid>())).Returns(booking);

            // Act
            var result = _sut.CancelBooking(bookingId);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public void CancelBooking_ReturnsNotFoundResult_WhenBookingDoesNotExist()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            _currentUserMock.Setup(x => x.Id).Returns(Guid.NewGuid().ToString());
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId, It.IsAny<Guid>())).Returns((Booking)null);

            // Act
            var result = _sut.CancelBooking(bookingId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public void CancelBooking_ReturnsBadRequestResult_WhenBookingAccessExceptionThrown()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            var booking = new Booking();
            _currentUserMock.Setup(x => x.Id).Returns(Guid.NewGuid().ToString());
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId, It.IsAny<Guid>())).Returns(booking);
            _bookingValidatorMock.Setup(x => x.ValidateCancellation(It.IsAny<Booking>())).Throws(new BookingAccessException("message"));

            // Act
            var result = _sut.CancelBooking(bookingId);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public void CancelBooking_ReturnsBadRequestResult_WhenLessThanThreeDaysLeftExceptionThrown()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            var booking = new Booking();
            _currentUserMock.Setup(x => x.Id).Returns(Guid.NewGuid().ToString());
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId, It.IsAny<Guid>())).Returns(booking);
            _bookingValidatorMock.Setup(x => x.ValidateCancellation(It.IsAny<Booking>())).Throws(new LessThanThreeDaysLeftException("message"));

            // Act
            var result = _sut.CancelBooking(bookingId);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public void CancelBooking_ReturnsStatusCodeResult_WhenBookingRemovalExceptionThrown()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            var booking = new Booking();
            _currentUserMock.Setup(x => x.Id).Returns(Guid.NewGuid().ToString());
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId, It.IsAny<Guid>())).Returns(booking);
            _bookingServiceMock.Setup(x => x.RemoveBookingById(It.IsAny<Guid>())).Throws(new BookingRemovalException("message"));

            // Act
            var result = _sut.CancelBooking(bookingId);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.That(objectResult.StatusCode, Is.EqualTo(500));
        }

        [Test]
        public void GetCustomerBookings_ReturnsAllBookings()
        {
            // Arrange
            var expectedBookings = new List<Booking>
            {
                new Booking { BookingId = Guid.NewGuid() },
                new Booking { BookingId = Guid.NewGuid() }
            };

            _currentUserMock.Setup(x => x.Id).Returns(Guid.NewGuid().ToString());
            _bookingServiceMock.Setup(x => x.GetAllCustomerBookings(It.IsAny<Guid>())).Returns(expectedBookings);

            // Act
            var result = _sut.GetCustomerBookings();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var actualBookings = okResult.Value as List<Booking>;
            Assert.That(actualBookings, Is.EqualTo(expectedBookings));
        }


        [Test]
        public void GetBookingDetails_ReturnsBookingDetails_ForValidId()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            var expectedBooking = new Booking { BookingId = bookingId };
            _currentUserMock.Setup(x => x.Id).Returns(Guid.NewGuid().ToString());
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId, It.IsAny<Guid>())).Returns(expectedBooking);

            // Act
            var result = _sut.GetBookingDetails(bookingId);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var actualBooking = okResult.Value as Booking;
            Assert.That(actualBooking, Is.EqualTo(expectedBooking));
        }

        [Test]
        public void GetBookingDetails_ReturnsNotFound_ForInvalidId()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            _currentUserMock.Setup(x => x.Id).Returns(Guid.NewGuid().ToString());
            _bookingServiceMock.Setup(x => x.GetBookingById(bookingId, It.IsAny<Guid>())).Returns((Booking)null);

            // Act
            var result = _sut.GetBookingDetails(bookingId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }
    }
}
