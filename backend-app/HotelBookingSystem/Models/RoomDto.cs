namespace HotelBookingSystem.API.Models
{
    public class RoomDto
    {
        public Guid RoomId { get; set; }

        public int RoomNumber { get; set; }

        public int Capacity { get; set; }

        public decimal Price { get; set; }
    }
}
