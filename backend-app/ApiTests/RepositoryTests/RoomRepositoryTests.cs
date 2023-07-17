using ApiTests.TestFixtures;
using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Data.RoomRepository;
using HotelBookingSystem.API.Models.Room;

namespace ApiTests.RepositoryTests
{
    public class RoomRepositoryTests
    {
        private IRoomRepository _sut;
        

        [SetUp]
        public void Setup()
        {
            _sut = new RoomRepository(DatabaseTestFixture.SetupDatabase());
        }

        [Test]
        public void GetRoomById_ReturnsRoom_IfCorrectId()
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
                Assert.That(roomActual?.Balcony, Is.EqualTo(roomExpected.Balcony));
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
            Assert.IsNull(roomActual);
        }

        [Test]
        public void GetAllRooms_ReturnsAllRooms()
        {
            // Arrange
            var roomsExpected = MockData.RoomsHardcoded;

            // Act
            var roomsActual = _sut.GetAllRooms();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(roomsActual, Is.Not.Null);
                Assert.That(roomsActual.Count, Is.EqualTo(roomsExpected.Count));

                var firstExpectedRoom = roomsExpected[0];
                var firstActualRoom = roomsActual[0];

                Assert.That(firstActualRoom.RoomId, Is.EqualTo(firstExpectedRoom.RoomId));
                Assert.That(firstActualRoom.RoomType, Is.EqualTo(firstExpectedRoom.RoomType));
                Assert.That(firstActualRoom.PeopleCapacity, Is.EqualTo(firstExpectedRoom.PeopleCapacity));
                Assert.That(firstActualRoom.FreeWiFi, Is.EqualTo(firstExpectedRoom.FreeWiFi));
            });
        }

        [Test]
        public void FindAvailableRoomsByCriteria_ReturnsAvailableRooms()
        {
            // Arrange
            DateTime startDate = new DateTime(2023, 7, 17);
            DateTime endDate = new DateTime(2023, 7, 27);
            int? peopleCapacity = 2;

            var expectedRooms = MockData.RoomsHardcoded.Where(
                    room => room.PeopleCapacity == peopleCapacity
                ).ToList();

            // Act
            var actualRooms = _sut.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actualRooms, Is.Not.Null);
                Assert.That(actualRooms.Count, Is.EqualTo(expectedRooms.Count));

                var firstExpectedRoom = expectedRooms[0];
                var firstActualRoom = actualRooms[0];

                Assert.That(firstActualRoom.RoomId, Is.EqualTo(firstExpectedRoom.RoomId));
                Assert.That(firstActualRoom.RoomType, Is.EqualTo(firstExpectedRoom.RoomType));
                Assert.That(firstActualRoom.PeopleCapacity, Is.EqualTo(firstExpectedRoom.PeopleCapacity));
                Assert.That(firstActualRoom.FreeWiFi, Is.EqualTo(firstExpectedRoom.FreeWiFi));
            });
        }

        [Test]
        public void FindAvailableRoomsByCriteria_ReturnsEmptyList_WhenNoRoomsAvailable()
        {
            // Arrange
            DateTime startDate = new DateTime(2023, 7, 17);
            DateTime endDate = new DateTime(2023, 7, 27);
            int? peopleCapacity = 10; 

            // Act
            var actualRooms = _sut.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            // Assert
            Assert.That(actualRooms, Is.Not.Null);
            Assert.That(actualRooms, Is.Empty);
        }
    }
}
