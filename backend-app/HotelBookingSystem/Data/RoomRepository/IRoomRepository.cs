using HotelBookingSystem.API.Models.Room;

namespace HotelBookingSystem.API.Data.RoomRepository
{
    public interface IRoomRepository
    {
        public List<Room> GetAllRooms();
        public Room? GetRoomById(Guid roomId);
        public List<Room> FindAvailableRoomsByCriteria(DateTime startDate, DateTime endDate, int? peopleCapacity);
    }
}
