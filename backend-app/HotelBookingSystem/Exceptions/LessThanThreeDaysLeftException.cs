using System.ComponentModel.DataAnnotations;

namespace HotelBookingSystem.API.Exceptions
{
    public class LessThanThreeDaysLeftException : ValidationException
    {
        public LessThanThreeDaysLeftException(string message) : base(message)
        {
        }
    }
}
