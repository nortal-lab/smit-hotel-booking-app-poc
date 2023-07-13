namespace HotelBookingSystem.API.Models.Room
{
    public class AvailableRoomsWrapper
    {
        public List<Room> AvailableRooms { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
