using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Data.BookingRepository
{
    public interface IBookingRepository
    {
        public List<Booking> GetAllBookings();
        public Booking? GetBookingById(Guid bookingId);
        public bool RemoveBookingById(Guid bookingId);
    }
}
