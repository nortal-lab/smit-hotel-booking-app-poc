using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Data.RoomRepository;
using HotelBookingSystem.API.Helpers;
using HotelBookingSystem.API.Models.Room;

namespace HotelBookingSystem.API.Services.RoomService
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IBookingRepository _bookingRepository;

        public RoomService(IRoomRepository roomRepository, IBookingRepository bookingRepository)
        {
            _roomRepository = roomRepository;
            _bookingRepository = bookingRepository;
        }

        public List<Room> GetAllRooms()
        {
            return _roomRepository.GetAllRooms();
        }

        public List<Room> FindAvailableRoomsByCriteria(DateTime startDate, DateTime endDate, int? peopleCapacity)
        {
            return _roomRepository.FindAvailableRoomsByCriteria(DateHelper.SetStartTimeTo1500(startDate),
                DateHelper.SetEndTimeTo1200(endDate), peopleCapacity);
        }
    }
}
