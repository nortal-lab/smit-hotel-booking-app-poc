using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Services.BookingService
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingService(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        public List<Booking> GetAllBookings()
        {
            return _bookingRepository.GetAllBookings();
        }

        public Booking? GetBookingById(Guid bookingId)
        {
            return _bookingRepository.GetBookingById(bookingId);
        }

        public void RemoveBookingById(Guid bookingId)
        {
             bool isRemoved = _bookingRepository.RemoveBookingById(bookingId);
             if (!isRemoved)
             {
                 throw new BookingRemovalException("Failed to remove the booking.");
             }
        }

        public List<Booking> FindAllActiveBookings()
        {
            return _bookingRepository.GetAllBookings().Where(booking => booking.EndDate >= DateTime.Now).ToList();
        }

        public void CreateBooking(Booking booking)
        {
            try
            {
                _bookingRepository.CreateBooking(booking);
            }
            catch (Exception)
            {
                throw new BookingCreationException("Failed to create the booking.");
            }
        }
    }
}
