namespace HotelBookingSystem.API.Exceptions
{
    public class BookingAccessException : Exception
    {
        public BookingAccessException(string message) : base(message)
        {
        }
    }
}
