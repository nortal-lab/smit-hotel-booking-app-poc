using HotelBookingSystem.API.Controllers.Customer;
using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models.Room;
using HotelBookingSystem.API.Services.RoomService;
using HotelBookingSystem.API.Validators.BookingValidator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace ApiTests.ControllerTests
{
    [TestFixture]
    public class CustomerRoomControllerTests
    {
        private Mock<IRoomService> _roomServiceMock;
        private Mock<IBookingValidator> _bookingValidatorMock;
        private Mock<ILogger<CustomerRoomController>> _loggerMock;
        private CustomerRoomController _sut;

        [SetUp]
        public void SetUp()
        {
            _roomServiceMock = new Mock<IRoomService>();
            _bookingValidatorMock = new Mock<IBookingValidator>();
            _loggerMock = new Mock<ILogger<CustomerRoomController>>();
            _sut = new CustomerRoomController(_roomServiceMock.Object, _bookingValidatorMock.Object, _loggerMock.Object);
        }

        [Test]
        public void FindAvailableRoomsByCriteria_ReturnsAvailableRooms()
        {
            // Arrange
            var startDate = DateTime.Now;
            var endDate = startDate.AddDays(2);
            var peopleCapacity = 2;
            var expectedAvailableRooms = new List<Room>();
            _roomServiceMock.Setup(x => x.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity)).Returns(expectedAvailableRooms);

            // Act
            var result = _sut.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
        }

        [Test]
        public void FindAvailableRoomsByCriteria_ReturnsBadRequest_WhenInvalidDateRangeExceptionThrown()
        {
            // Arrange
            var startDate = DateTime.Now;
            var endDate = startDate.AddDays(2);
            var peopleCapacity = 2;
            _bookingValidatorMock.Setup(x => x.BookingDateRangeValidation(startDate, endDate)).Throws(new InvalidDateRangeException("message"));

            // Act
            var result = _sut.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public void GetRoomDetails_ReturnsRoom_ForValidId()
        {
            // Arrange
            var roomId = Guid.NewGuid();
            var expectedRoom = new Room();
            _roomServiceMock.Setup(x => x.GetRoomById(roomId)).Returns(expectedRoom);

            // Act
            var result = _sut.GetRoomDetails(roomId);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var actualRoom = okResult.Value as Room;
            Assert.AreEqual(expectedRoom, actualRoom);
        }

        [Test]
        public void GetRoomDetails_ReturnsNotFound_ForInvalidId()
        {
            // Arrange
            var roomId = Guid.NewGuid();
            _roomServiceMock.Setup(x => x.GetRoomById(roomId)).Returns((Room)null);

            // Act
            var result = _sut.GetRoomDetails(roomId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }
    }
}
