using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Data.BookingRepository
{
    public interface IBookingRepository
    {
        public List<Booking> GetAllCustomerBookings(Guid customerId);
        public List<Booking> FindAllActiveBookings();
        public Booking? GetBookingById(Guid bookingId);
        public bool RemoveBookingById(Guid bookingId);
        public void CreateBooking(Booking booking);
    }
}
