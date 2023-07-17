using System.ComponentModel.DataAnnotations;
using HotelBookingSystem.API.Common;
using HotelBookingSystem.API.Helpers;

namespace HotelBookingSystem.API.Models
{
    public class Booking
    {
        [Key]
        public Guid BookingId {get; set; }

        public int BookingIdentifierNumber { get; set; }

        public Guid CustomerId { get; set; }

        public string? CustomerFirstName { get; set; }

        public string? CustomerLastName { get; set; }

        public Guid RoomId { get; set; }

        public DateTime CreationDate { get; set; }

        private DateTime _startDate;
        public DateTime StartDate
        {
            get { return _startDate; }
            set
            {
                _startDate = DateHelper.SetStartTimeTo1500(value);
            }
        }

        private DateTime _endDate;
        public DateTime EndDate
        {
            get { return _endDate; }
            set
            {
                _endDate = DateHelper.SetEndTimeTo1200(value);
            }
        }

        public decimal TotalPriceForStayDuration { get; set; }

        public Status Status { get; set; }
    }
}
