using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Data.RoomRepository
{
    public interface IRoomRepository
    {
        public List<Room> GetAllRooms();
    }
}
