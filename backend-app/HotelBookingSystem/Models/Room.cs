using System.ComponentModel.DataAnnotations;

namespace HotelBookingSystem.API.Models
{
    public class Room
    {
        [Key]
        public Guid RoomId { get; set; }

        public decimal PricePerNight { get; set; }

        public int RoomNumber { get; set; }

        public int Capacity { get; set; }

        public int NumberOfBeds { get; set; }

        public int RoomSizeInSquareMeters { get; set; }

        public bool IncludedTv { get; set; }
    }
}
