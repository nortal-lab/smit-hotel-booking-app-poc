namespace HotelBookingSystem.API.Exceptions
{
    public class BookingCreationException : Exception
    {
        public BookingCreationException(string message) : base(message)
        {
        }
    }
}
