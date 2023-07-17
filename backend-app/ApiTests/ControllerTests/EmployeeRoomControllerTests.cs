using HotelBookingSystem.API.Controllers.Employee;
using HotelBookingSystem.API.Models.Room;
using HotelBookingSystem.API.Services.RoomService;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace ApiTests.ControllerTests
{
    [TestFixture]
    public class EmployeeRoomControllerTests
    {
        private Mock<IRoomService> _roomServiceMock;
        private EmployeeRoomController _controller;

        [SetUp]
        public void SetUp()
        {
            _roomServiceMock = new Mock<IRoomService>();
            _controller = new EmployeeRoomController(_roomServiceMock.Object);
        }

        [Test]
        public void GetAllRooms_ReturnsOkResult_WithListOfRooms()
        {
            // Arrange
            var rooms = new List<Room>() { new Room(), new Room() };
            _roomServiceMock.Setup(x => x.GetAllRooms()).Returns(rooms);

            // Act
            var result = _controller.GetAllRooms();

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            Assert.That(okResult.Value, Is.EqualTo(rooms));
        }

        [Test]
        public void FindAvailableRoomsByCriteria_ReturnsOkResult_WithListOfRooms()
        {
            // Arrange
            var rooms = new List<Room>() { new Room(), new Room() };
            _roomServiceMock.Setup(x => x.FindAvailableRoomsByCriteria(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<int?>())).Returns(rooms);

            // Act
            var result = _controller.FindAvailableRoomsByCriteria(DateTime.Now, DateTime.Now.AddDays(1), null);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            Assert.That(okResult.Value, Is.EqualTo(rooms));
        }

        [Test]
        public void GetRoomDetails_ReturnsOkResult_WhenRoomExists()
        {
            // Arrange
            var roomId = Guid.NewGuid();
            _roomServiceMock.Setup(x => x.GetRoomById(roomId)).Returns(new Room());

            // Act
            var result = _controller.GetRoomDetails(roomId);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            Assert.That(okResult.Value, Is.TypeOf<Room>());
        }

        [Test]
        public void GetRoomDetails_ReturnsNotFound_WhenRoomDoesNotExist()
        {
            // Arrange
            var roomId = Guid.NewGuid();
            _roomServiceMock.Setup(x => x.GetRoomById(roomId)).Returns((Room)null);

            // Act
            var result = _controller.GetRoomDetails(roomId);

            // Assert
            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }
    }

}
