using HotelBookingSystem.API.Common;
using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Data.BookingRepository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly HotelBookingSystemDbContext _dbContext;

        public BookingRepository(HotelBookingSystemDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbContext.Database.EnsureCreated();
        }

        public List<Booking> GetAllBookings()
        {
            return _dbContext.Bookings.ToList();
        }

        public Booking? GetBookingById(Guid bookingId)
        {
            return _dbContext.Bookings.SingleOrDefault(booking => booking.BookingId == bookingId);
        }

        public bool RemoveBookingById(Guid bookingId)
        {
            var bookingToRemove = _dbContext.Bookings.SingleOrDefault(booking => booking.BookingId == bookingId);

            if (bookingToRemove == null)
            {
                return false;
            }

            _dbContext.Bookings.Remove(bookingToRemove);
            _dbContext.SaveChanges();

            return true;
        }
    }
}
