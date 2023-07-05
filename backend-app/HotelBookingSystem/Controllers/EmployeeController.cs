using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers
{
    [Route("employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpGet("rooms")]
        public IActionResult GetAllRooms()
        {
            var rooms = MockData.RoomsHardcoded;
            if (rooms == null)
            {
                return NotFound();
            }

            return Ok(rooms);
        }

        [HttpGet("bookings/active")]
        public IActionResult FindAllActiveBookingDtos()
        {
            var activeBookingDtos = MockData.BookingsHardcoded.Where(b => b.EndDate >= DateTime.Now).ToList();
            
            return Ok(activeBookingDtos);
        }

        [HttpGet("rooms/available")]
        public IActionResult FindAvailableRoomsByCriteria([FromQuery] DateTime startDate, DateTime endDate, decimal? priceMin, decimal? priceMax, int? capacity)
        {
            //ToDo: Implement filtering logic in services
            //var availableRooms = RoomsHardcoded.Where(room =>
            //    (capacity == null || room.Capacity >= capacity) &&
            //    (priceMin == null || room.Price >= priceMin) &&
            //    (priceMax == null || room.Price <= priceMax) &&
            //    !BookingsHardcoded.Any(booking =>
            //        booking.RoomId == room.RoomId &&
            //        !(startDate >= booking.EndDate || endDate <= booking.StartDate)
            //    )
            //).ToList();

            return Ok(MockData.RoomsHardcoded.LastOrDefault());
        }

        [HttpDelete("bookings/{bookingId}")]
        public IActionResult CancelBooking([FromRoute] Guid bookingId)
        {
            var booking = GetBookingObject(bookingId);

            if (booking == null)
            {
                return NotFound();
            }

            var canBeCancelled = ValidateBookingCancellation(booking);
            if (!canBeCancelled)
            {
                // Return a 500 Internal Server Error if the cancellation fails
                return StatusCode(500, "Booking cancellation failed: too close to booking start date.");
            }

            var isCancelled = DeleteBookingById(bookingId);
            if (!isCancelled)
            {
                // Return a 500 Internal Server Error if the cancellation fails
                return StatusCode(500, "Booking cancellation failed.");
            }

            // Return a 204 No Content response (successful cancellation)
            return NoContent();
        }

        private bool DeleteBookingById(Guid bookingId)
        {
            var itemsRemovedCount = MockData.BookingsHardcoded.RemoveAll(booking => booking.BookingId == bookingId);

            if (itemsRemovedCount > 0)
            {
                return true;
            }

            return false;
        }

        // Business rule: cannot be cancelled if fewer than 3 days left before start
        private bool ValidateBookingCancellation(BookingDto booking)
        {

            if (booking?.StartDate.AddDays(-3) < DateTime.Now)
            {
                return false;
            }

            return true;
        }

        private static BookingDto? GetBookingObject(Guid bookingId)
        {
            return MockData.BookingsHardcoded.SingleOrDefault(booking => booking.BookingId == bookingId);
        }
    }
}
