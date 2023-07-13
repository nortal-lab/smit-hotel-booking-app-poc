using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Validators.BookingValidator
{
    public class BookingValidator : IBookingValidator
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingValidator(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        public void ValidateDoubleBooking(Booking booking)
        {
            bool bookingDateIsAvailable = _bookingRepository.IsBookingDateAvailable(booking);
            if (!bookingDateIsAvailable)
            {
                throw new BookingDateOverlapException("The booking date overlaps with an existing booking.");
            }
        }

        public void ValidateCreation(Booking booking)
        {
            BookingDateRangeValidation(booking.StartDate, booking.EndDate);
        }

        public void ValidateCancellation(Booking booking)
        {
            LessThanThreeDaysLeftBeforeStartValidation(booking);
        }

        public void BookingDateRangeValidation(DateTime startDate, DateTime endDate)
        {
            if (startDate == default || endDate == default || startDate > endDate)
            {
                throw new InvalidDateRangeException("Invalid date range. Please provide valid start and end dates.");
            }
        }

        // Business rule: cannot be cancelled if fewer than 3 days left before start
        private void LessThanThreeDaysLeftBeforeStartValidation(Booking booking)
        {
            bool lessThanThreeDaysLeftBeforeCancellation = booking?.StartDate.AddDays(-3) < DateTime.Now;

            if (lessThanThreeDaysLeftBeforeCancellation)
            {
                throw new LessThanThreeDaysLeftException("Booking cannot be cancelled with less than three days left before start.");
            }
        }
    }
}
