namespace HotelBookingSystem.API.Exceptions
{
    public class SameNightBookingNotAvailableException : Exception
    {
        public SameNightBookingNotAvailableException(string message) : base(message)
        {
        }
    }
}
