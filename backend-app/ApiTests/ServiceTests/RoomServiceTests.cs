using ApiTests.TestFixtures;
using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Data.RoomRepository;
using HotelBookingSystem.API.Models.Room;
using HotelBookingSystem.API.Services.RoomService;

namespace ApiTests.ServiceTests
{
    public class RoomServiceTests
    {
        private IRoomRepository _roomRepository;
        private IRoomService _sut;

        [SetUp]
        public void Setup()
        {
            _roomRepository = new RoomRepository(DatabaseTestFixture.SetupDatabase());
            _sut = new RoomService(_roomRepository);
        }

        [Test]
        public void GetAllRooms_ReturnsAllRooms_IfThereAreAny()
        {
            // Arrange
            List<Room> roomsExpected = MockData.RoomsHardcoded;

            // Act
            List<Room> roomsActual = _sut.GetAllRooms();

            // Assert
            Assert.That(roomsActual, Has.Count.EqualTo(roomsExpected.Count));
        }

        [Test]
        public void GetRoomById_ReturnsRoom_IfRoomIdCorrect()
        {
            // Arrange
            Room roomExpected = MockData.RoomsHardcoded.ElementAt(0);
            Guid roomId = roomExpected.RoomId;

            // Act
            Room? roomActual = _sut.GetRoomById(roomId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(roomActual?.RoomId, Is.EqualTo(roomExpected.RoomId));
                Assert.That(roomActual?.RoomNumber, Is.EqualTo(roomExpected.RoomNumber));
                Assert.That(roomActual?.RoomType, Is.EqualTo(roomExpected.RoomType));
                Assert.That(roomActual?.PricePerNightIncludingTaxes, Is.EqualTo(roomExpected.PricePerNightIncludingTaxes));
                Assert.That(roomActual?.FreeWiFi, Is.EqualTo(roomExpected.FreeWiFi));
                Assert.That(roomActual?.FreeBottledWater, Is.EqualTo(roomExpected.FreeBottledWater));
                Assert.That(roomActual?.BathrobeAndSlippers, Is.EqualTo(roomExpected.BathrobeAndSlippers));
                Assert.That(roomActual?.InRoomSafe, Is.EqualTo(roomExpected.InRoomSafe));
                Assert.That(roomActual?.IronAndIroningBoard, Is.EqualTo(roomExpected.IronAndIroningBoard));
                Assert.That(roomActual?.SmartTV, Is.EqualTo(roomExpected.SmartTV));
                Assert.That(roomActual?.AirConditioning, Is.EqualTo(roomExpected.AirConditioning));
                Assert.That(roomActual?.RainShower, Is.EqualTo(roomExpected.RainShower));
                Assert.That(roomActual?.ProfessionalHairDryer, Is.EqualTo(roomExpected.ProfessionalHairDryer));
                Assert.That(roomActual?.EstimatedTaxes, Is.EqualTo(roomExpected.EstimatedTaxes));
                Assert.That(roomActual?.PeopleCapacity, Is.EqualTo(roomExpected.PeopleCapacity));
                Assert.That(roomActual?.PriceBeforeTaxes, Is.EqualTo(roomExpected.PriceBeforeTaxes));
                Assert.That(roomActual?.RoomSizeInSquareMeters, Is.EqualTo(roomExpected.RoomSizeInSquareMeters));
                Assert.That(roomActual?.BedsType, Is.EqualTo(roomExpected.BedsType));
            });
        }

        [Test]
        public void GetRoomById_ReturnsNoRooms_IfNotCorrectId()
        {
            // Arrange
            Guid roomId = Guid.NewGuid();

            // Act
            Room? roomActual = _sut.GetRoomById(roomId);

            // Assert
            Assert.That(roomActual, Is.Null);
        }
    }
}
