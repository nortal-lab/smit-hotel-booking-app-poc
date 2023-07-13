using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Validators.BookingValidator
{
    public interface IBookingValidator
    {
        public void ValidateDoubleBooking(Booking booking);
        public void ValidateCreation(Booking booking);
        public void ValidateCancellation(Booking booking);
        public void BookingDateRangeValidation(DateTime startDate, DateTime endDate);
    }
}
