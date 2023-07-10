using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Data.RoomRepository;
using HotelBookingSystem.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers
{
    [Route("")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IBookingRepository _bookingRepository;

        public CustomerController(IRoomRepository roomRepository, IBookingRepository bookingRepository)
        {
            _roomRepository = roomRepository;
            _bookingRepository = bookingRepository;
        }

        /// <summary>
        /// Search for available rooms
        /// </summary>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <param name="priceMin">Minimum price</param>
        /// <param name="priceMax">Maximum price</param>
        /// <param name="capacity">Minimal capacity</param>
        /// <returns>Available rooms matching search criteria</returns>
        [HttpGet("rooms/available")]
        public IActionResult FindAvailableRoomsByCriteria([FromQuery] DateTime startDate, DateTime endDate, decimal? priceMin, decimal? priceMax, int? capacity)
        {
            if (startDate == default || endDate == default || startDate >= endDate)
            {
                return BadRequest("Invalid date range. Please provide valid 'startDate' and 'endDate' values.");
            }

            //ToDo: Implement filtering logic in services
            //var availableRooms = RoomsHardcoded.Where(room =>
            //    (capacity == null || room.Capacity >= capacity) &&
            //    (priceMin == null || room.PricePerNight >= priceMin) &&
            //    (priceMax == null || room.PricePerNight <= priceMax) &&
            //    !BookingsHardcoded.Any(booking =>
            //        booking.RoomId == room.RoomId &&
            //        !(startDate >= booking.EndDate || endDate <= booking.StartDate)
            //    )
            //).ToList();

            return Ok(_roomRepository.GetAllRooms().FirstOrDefault());
        }

        [HttpGet("bookings")]
        [Authorize(Roles = "customer")]
        public IActionResult GetCustomerBookings()
        {
            return Ok(_bookingRepository.GetAllBookings());
        }

        [HttpGet("bookings/{bookingId}")]
        [Authorize(Roles = "customer")]
        public IActionResult GetBookingDetails([FromRoute] Guid bookingId)
        {
            Booking? booking = _bookingRepository.GetBookingById(bookingId);

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        [HttpPost("bookings")]
        [Authorize(Roles = "customer")]
        public IActionResult CreateBooking([FromBody] Booking booking)
        {
            // If needed, do something with the booking, like maybe validation, saving to db, etc.

            return CreatedAtAction(nameof(GetBookingDetails), new { bookingId = booking.BookingId }, booking);
        }

        [HttpDelete("bookings/{bookingId}")]
        [Authorize(Roles = "customer")]
        public IActionResult CancelBooking([FromRoute] Guid bookingId)
        {
            Booking? booking = _bookingRepository.GetBookingById(bookingId);
            if (booking == null)
            {
                return NotFound();
            }

            bool canBeCancelled = ValidateBookingCancellation(booking);
            if (!canBeCancelled)
            {
                // Return a 500 Internal Server Error if the cancellation fails
                return StatusCode(500, "Booking cancellation failed: too close to booking start date.");
            }

            bool isCancelled = _bookingRepository.RemoveBookingById(bookingId);
            if (!isCancelled)
            {
                // Return a 500 Internal Server Error if the cancellation fails
                return StatusCode(500, "Booking cancellation failed.");
            }

            // Return a 204 No Content response (successful cancellation)
            return NoContent();
        }

        // Business rule: cannot be cancelled if fewer than 3 days left before start
        public static bool ValidateBookingCancellation(Booking booking)
        {
            return !(booking?.StartDate.AddDays(-3) < DateTime.Now);
        }
    }
}
