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

        public List<Booking> GetAllCustomerBookings(Guid customerId)
        {
            return _dbContext.Bookings
                .Where(booking => booking.CustomerId == customerId)
                .ToList();
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

        public void CreateBooking(Booking booking)
        {
            _dbContext.Bookings.Add(booking);
            _dbContext.SaveChanges();
        }

        public List<Booking> FindAllActiveBookings()
        {
            return _dbContext.Bookings.Where(booking => booking.EndDate >= DateTime.Now).ToList();
        }
    }
}
