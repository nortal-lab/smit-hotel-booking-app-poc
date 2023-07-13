using HotelBookingSystem.API.Common;
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

        public List<Booking> GetAllCustomerBookings(Guid customerId)
        {
            return _bookingRepository.GetAllCustomerBookings(customerId);
        }

        public Booking? GetBookingById(Guid bookingId, Guid customerId)
        {
            Booking? booking = GetBookingById(bookingId);

            if (booking?.CustomerId != customerId)
            {
                throw new BookingAccessException("Customers can only access their own bookings.");
            }

            return booking;
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
            return _bookingRepository.FindAllActiveBookings();
        }

        public Booking CreateBooking(Booking booking, Guid customerId)
        {
            try
            {
                Booking preparedBooking = PrepareBooking(booking, customerId);
                _bookingRepository.CreateBooking(preparedBooking);
                return preparedBooking;
            }
            catch (Exception)
            {
                throw new BookingCreationException("Failed to create the booking.");
            }
        }

        private Booking PrepareBooking(Booking booking, Guid customerId)
        {
            DateTime startDate = booking.StartDate;
            DateTime endDate = booking.EndDate;

            Booking preparedBooking = new()
            {
                BookingId = Guid.NewGuid(),
                CustomerId = customerId,
                RoomId = booking.RoomId,
                CreationDate = DateTime.Now,
                StartDate = new DateTime(startDate.Year, startDate.Month, startDate.Day, 15, 0, 0),
                EndDate = new DateTime(endDate.Year, endDate.Month, endDate.Day, 12, 0, 0),
                Status = Status.Confirmed
            };

            return preparedBooking;
        }
    }
}
