using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Services.BookingService
{
    public interface IBookingService
    {
        public List<Booking> GetAllBookings();
        public Booking? GetBookingById(Guid bookingId);
        public void RemoveBookingById(Guid bookingId);
        public List<Booking> FindAllActiveBookings();
        public void CreateBooking(Booking booking);
    }
}
