using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Services.BookingService
{
    public interface IBookingService
    {
        public List<Booking> GetAllCustomerBookings(Guid customerId);
        public Booking? GetBookingById(Guid bookingId, Guid customerId);
        public Booking? GetBookingById(Guid bookingId);
        public void RemoveBookingById(Guid bookingId);
        public List<Booking> FindAllActiveBookings();
        public Booking CreateBooking(Booking booking, Guid customerId);
    }
}
