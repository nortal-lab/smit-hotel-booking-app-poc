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
    }
}
