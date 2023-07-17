using HotelBookingSystem.API.Auth.Model;
using HotelBookingSystem.API.Common;
using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Helpers;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Models.Room;
using HotelBookingSystem.API.Services.PricingService;
using HotelBookingSystem.API.Services.RoomService;

namespace HotelBookingSystem.API.Services.BookingService
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IRoomService _roomService;
        private readonly IPricingService _pricingService;
        private readonly ILogger<BookingService> _logger;

        public BookingService(IBookingRepository bookingRepository, ILogger<BookingService> logger, IRoomService roomService, IPricingService pricingService)
        {
            _bookingRepository = bookingRepository;
            _logger = logger;
            _roomService = roomService;
            _pricingService = pricingService;
        }

        public List<Booking> GetAllCustomerBookings(Guid customerId)
        {
            return _bookingRepository.GetAllCustomerBookings(customerId);
        }

        public Booking? GetBookingById(Guid bookingId, Guid customerId)
        {
            Booking ? booking = GetBookingById(bookingId);
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
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to create the booking.");
                throw new BookingCreationException("Failed to create the booking.");
            }
        }

        private Booking PrepareBooking(Booking booking, ICurrentUser customer)
        {
            DateTime startDate = DateHelper.SetStartTimeTo1500(booking.StartDate);
            DateTime endDate = DateHelper.SetEndTimeTo1200(booking.EndDate);

            Room? room = _roomService.GetRoomById(booking.RoomId);

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
                TotalPriceForStayDuration = _pricingService.CalculateTotalPriceForStayDuration(startDate, endDate, room.PricePerNightIncludingTaxes),
                Status = Status.Confirmed
            };

            return preparedBooking;
        }

        
    }
}
