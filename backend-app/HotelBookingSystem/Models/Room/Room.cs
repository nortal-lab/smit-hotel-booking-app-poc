using System.ComponentModel.DataAnnotations;

namespace HotelBookingSystem.API.Models.Room
{
    public class Room
    {
        [Key]
        public Guid RoomId { get; set; }

        public RoomType RoomType { get; set; }

        public int RoomNumber { get; set; }

        public decimal PricePerNight { get; set; }

        public int PeopleCapacity { get; set; }

        public RoomBedsType BedsType { get; set; }

        public int RoomSizeInSquareMeters { get; set; }

        // Amenities are listed below
        // ToDo: In the future below fields can be moved to a separate Amenities class.
        public bool FreeWiFi { get; set; } = true;

        public bool FreeBottledWater { get; set; } = true;

        public bool BathrobeAndSlippers { get; set; } = true;

        public bool InRoomSafe { get; set; } = true;

        public bool IronAndIroningBoard { get; set; } = true;

        public bool SmartTV { get; set; } = true;

        public bool AirConditioning { get; set; } = true;

        public bool RainShower { get; set; } = true;

        public bool ProfessionalHairDryer { get; set; } = true;

        public bool Balcony { get; set; } = false;
    }
}
