using HotelBookingSystem.API.Models.Room;

namespace HotelBookingSystem.API.Services.RoomService
{
    public interface IRoomService
    {
        public List<Room> GetAllRooms();
        List<Room> FindAvailableRoomsByCriteria(DateTime startDate, DateTime endDate,
            int? peopleCapacity);
    }
}
