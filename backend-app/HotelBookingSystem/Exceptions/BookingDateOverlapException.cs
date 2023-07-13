namespace HotelBookingSystem.API.Exceptions
{
    public class BookingDateOverlapException : Exception
    {
        public BookingDateOverlapException(string message) : base(message)
        {
        }
    }
}
