using HotelBookingSystem.API.Helpers;
using HotelBookingSystem.API.Models;

namespace ApiTests.TestHelpers
{
    public class BookingTestFixture
    {
        public static Booking SetUpBooking(Guid roomId, DateTime startDate, DateTime endDate)
        {
            return new Booking
            {
                CustomerId = Guid.NewGuid(),
                RoomId = roomId,
                StartDate = DateHelper.SetStartTimeTo1500(startDate),
                EndDate = DateHelper.SetEndTimeTo1200(endDate),
                CustomerFirstName = "firstname",
                CustomerLastName = "lastname"
            };
        }
    }
}
