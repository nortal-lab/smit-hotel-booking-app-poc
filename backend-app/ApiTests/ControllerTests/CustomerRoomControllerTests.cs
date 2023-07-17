using HotelBookingSystem.API.Controllers.Customer;
using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models.Room;
using HotelBookingSystem.API.Services.PricingService;
using HotelBookingSystem.API.Services.RoomService;
using HotelBookingSystem.API.Validators.BookingValidator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace ApiTests.ControllerTests
{
    [TestFixture]
    public class CustomerRoomControllerTests
    {
        private Mock<IRoomService> _roomServiceMock;
        private Mock<IBookingValidator> _bookingValidatorMock;
        private Mock<ILogger<CustomerRoomController>> _loggerMock;
        private Mock<IPricingService> _pricingServiceMock;
        private CustomerRoomController _sut;

        [SetUp]
        public void SetUp()
        {
            _roomServiceMock = new Mock<IRoomService>();
            _bookingValidatorMock = new Mock<IBookingValidator>();
            _loggerMock = new Mock<ILogger<CustomerRoomController>>();
            _pricingServiceMock = new Mock<IPricingService>();
            _sut = new CustomerRoomController(_roomServiceMock.Object, _bookingValidatorMock.Object, _loggerMock.Object, _pricingServiceMock.Object);
        }

        [Test]
        public void FindAvailableRoomsByCriteria_ReturnsAvailableRooms()
        {
            // Arrange
            var startDate = DateTime.Now;
            var endDate = startDate.AddDays(2);
            var peopleCapacity = 2;
            var expectedRoom = new Room();
            var expectedAvailableRooms = new List<Room> { expectedRoom };
            _roomServiceMock.Setup(x => x.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity)).Returns(expectedAvailableRooms);
            _pricingServiceMock.Setup(x => x.CalculateTotalPriceForStayDuration(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<decimal>())).Returns(100m);

            // Act
            var result = _sut.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var actualAvailableRooms = okResult.Value as AvailableRoomsWrapper;
            Assert.That(actualAvailableRooms.AvailableRooms.Count, Is.EqualTo(expectedAvailableRooms.Count));
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
            Assert.That(actualRoom, Is.EqualTo(expectedRoom));
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
