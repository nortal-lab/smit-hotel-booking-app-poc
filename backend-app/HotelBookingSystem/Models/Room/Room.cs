using System.ComponentModel.DataAnnotations;

namespace HotelBookingSystem.API.Models.Room
{
    public class Room
    {
        [Key]
        public Guid RoomId { get; set; }

        public RoomType RoomType { get; set; }

        public int RoomNumber { get; set; }

        private decimal _pricePerNightIncludingTaxes { get; set; }

        public decimal PricePerNightIncludingTaxes
        {
            get => _pricePerNightIncludingTaxes;
            set
            {
                _pricePerNightIncludingTaxes = value;
                EstimatedTaxes = CalculateEstimatedTaxes(_pricePerNightIncludingTaxes);
                PriceBeforeTaxes = CalculatePriceBeforeTaxes(value, EstimatedTaxes);
            }
        }

        public decimal PriceBeforeTaxes { get; private set; }

        public decimal EstimatedTaxes { get; private set; }

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

        private decimal CalculatePriceBeforeTaxes(decimal pricePerNightIncludingTaxes, decimal estimatedTaxes)
        {
            return pricePerNightIncludingTaxes - estimatedTaxes;
        }

        private decimal CalculateEstimatedTaxes(decimal pricePerNightIncludingTaxes)
        {
            return pricePerNightIncludingTaxes * 0.21m;
        }
    }
}
