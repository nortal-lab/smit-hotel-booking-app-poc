using HotelBookingSystem.API.Models.Room;

namespace HotelBookingSystem.API.Data.RoomRepository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly HotelBookingSystemDbContext _dbContext;

        public RoomRepository(HotelBookingSystemDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbContext.Database.EnsureCreated();
        }

        public List<Room> GetAllRooms()
        {
            return _dbContext.Rooms.ToList();
        }

        public Room? GetRoomById(Guid roomId)
        {
            return _dbContext.Rooms.SingleOrDefault(room => room.RoomId == roomId);
        }

        public List<Room> FindAvailableRoomsByCriteria(DateTime startDate, DateTime endDate, int? peopleCapacity)
        {
            var availableRooms = from room in _dbContext.Rooms
                join booking in _dbContext.Bookings
                    on room.RoomId equals booking.RoomId
                    into roomBookings
                where (peopleCapacity == null || room.PeopleCapacity == peopleCapacity)
                      && roomBookings.All(booking => (startDate > booking.EndDate || endDate < booking.StartDate))
                select room;

            return availableRooms.ToList();
        }
    }
}
