using HotelBookingSystem.API.Auth.Model;
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

        public Booking CreateBooking(Booking booking, ICurrentUser customer)
        {
            try
            {
                Booking preparedBooking = PrepareBooking(booking, customer);
                _bookingRepository.CreateBooking(preparedBooking);
                return preparedBooking;
            }
            catch (Exception)
            {
                throw new BookingCreationException("Failed to create the booking.");
            }
        }

        private Booking PrepareBooking(Booking booking, ICurrentUser customer)
        {
            DateTime startDate = booking.StartDate;
            DateTime endDate = booking.EndDate;

            Booking preparedBooking = new()
            {
                BookingId = Guid.NewGuid(),
                BookingIdentifierNumber = new Random().Next(10000000, 99999999),
                CustomerId = new Guid(customer.Id),
                CustomerFirstName = customer.FirstName,
                CustomerLastName = customer.LastName,
                RoomId = booking.RoomId,
                CreationDate = DateTime.Now,
                StartDate = startDate,
                EndDate = endDate,
                Status = Status.Confirmed
            };

            return preparedBooking;
        }
    }
}
