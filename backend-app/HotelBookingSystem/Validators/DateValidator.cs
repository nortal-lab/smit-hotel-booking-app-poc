using HotelBookingSystem.API.Exceptions;

namespace HotelBookingSystem.API.Validators
{
    public static class DateValidator
    {
        public static void DateRangeValidation(DateTime startDate, DateTime endDate)
        {
            if (startDate == default || endDate == default || startDate > endDate)
            {
                throw new InvalidDateRangeException("Invalid date range. Please provide valid start and end dates.");
            }
        }
    }
}
