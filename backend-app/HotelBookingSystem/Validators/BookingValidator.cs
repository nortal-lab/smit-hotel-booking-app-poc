using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Validators;

namespace HotelBookingSystem.API.Helpers
{
    public static class BookingValidator
    {
        public static void ValidateCreation(Booking booking)
        {
            DateValidator.DateRangeValidation(booking.StartDate, booking.EndDate);
        }

        public static void ValidateCancellation(Booking booking)
        {
            LessThanThreeDaysLeftBeforeStartValidation(booking);
        }

        // Business rule: cannot be cancelled if fewer than 3 days left before start
        private static void LessThanThreeDaysLeftBeforeStartValidation(Booking booking)
        {
            bool lessThanThreeDaysLeftBeforeCancellation = booking?.StartDate.AddDays(-3) < DateTime.Now;

            if (lessThanThreeDaysLeftBeforeCancellation)
            {
                throw new LessThanThreeDaysLeftException("Booking cannot be cancelled with less than three days left before start.");
            }
        }
    }
}
