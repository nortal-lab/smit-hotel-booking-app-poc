using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Helpers
{
    public static class BookingValidator
    {
        // Business rule: cannot be cancelled if fewer than 3 days left before start
        public static void ValidateCancellation(Booking booking)
        {
            LessThanThreeDaysLeftBeforeStartValidation(booking);
        }

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
