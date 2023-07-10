using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Data.RoomRepository;
using HotelBookingSystem.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers
{
    [Route("employee")]
    [ApiController]
    [Authorize(Roles = "employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IBookingRepository _bookingRepository;

        public EmployeeController(IRoomRepository roomRepository, IBookingRepository bookingRepository)
        {
            _roomRepository = roomRepository;
            _bookingRepository = bookingRepository;
        }

        [HttpGet("rooms")]
        public IActionResult GetAllRooms()
        {
            return Ok(_roomRepository.GetAllRooms());
        }

        [HttpGet("bookings/active")]
        public IActionResult FindAllActiveBookingDtos()
        {
            var activeBookingDtos = _bookingRepository.GetAllBookings().Where(b => b.EndDate >= DateTime.Now).ToList();
            
            return Ok(activeBookingDtos);
        }

        [HttpGet("rooms/available")]
        public IActionResult FindAvailableRoomsByCriteria([FromQuery] DateTime startDate, DateTime endDate, decimal? priceMin, decimal? priceMax, int? capacity)
        {
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

            return Ok(_roomRepository.GetAllRooms().LastOrDefault());
        }

        [HttpDelete("bookings/{bookingId}")]
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
