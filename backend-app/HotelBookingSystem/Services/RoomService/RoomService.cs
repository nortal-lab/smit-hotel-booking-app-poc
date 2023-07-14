using HotelBookingSystem.API.Data.RoomRepository;
using HotelBookingSystem.API.Helpers;
using HotelBookingSystem.API.Models.Room;

namespace HotelBookingSystem.API.Services.RoomService
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;

        public RoomService(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        public List<Room> GetAllRooms()
        {
            return _roomRepository.GetAllRooms();
        }

        public Room? GetRoomById(Guid roomId)
        {
            return _roomRepository.GetRoomById(roomId);
        }

        public List<Room> FindAvailableRoomsByCriteria(DateTime startDate, DateTime endDate, int? peopleCapacity)
        {
            return _roomRepository.FindAvailableRoomsByCriteria(DateHelper.SetStartTimeTo1500(startDate),
                DateHelper.SetEndTimeTo1200(endDate), peopleCapacity);
        }
    }
}
