using System.ComponentModel.DataAnnotations;
using HotelBookingSystem.API.Common;

namespace HotelBookingSystem.API.Models
{
    public class Booking
    {
        [Key]
        public Guid BookingId {get; set; }

        public Guid CustomerId { get; set; }

        public Guid RoomId { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public Status Status { get; set; }
    }
}
