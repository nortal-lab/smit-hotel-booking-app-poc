using HotelBookingSystem.API.Common;
using HotelBookingSystem.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingSystem.API.Data.RoomRepository
{
    public class RoomRepository : IRoomRepository
    {
        private HotelBookingSystemDbContext _dbContext;

        public RoomRepository(HotelBookingSystemDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbContext.Database.EnsureCreated();
        }

        public List<Room> GetAllRooms()
        {
            return _dbContext.Rooms.ToList();
        }
    }
}
