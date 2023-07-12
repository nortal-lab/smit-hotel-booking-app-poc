using HotelBookingSystem.API.Auth.Model;
using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Helpers;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Models.Room;
using HotelBookingSystem.API.Services.BookingService;
using HotelBookingSystem.API.Services.RoomService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers
{
    [Route("")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IBookingService _bookingService;

        public CustomerController(IRoomService roomService, IBookingService bookingService)
        {
            _roomService = roomService;
            _bookingService = bookingService;
        }

        /// <summary>
        /// Search for available rooms
        /// </summary>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <param name="peopleCapacity">Minimal Capacity</param>
        /// <returns>Available rooms matching search criteria</returns>
        [HttpGet("rooms/available")]
        public IActionResult FindAvailableRoomsByCriteria([FromQuery] DateTime startDate, DateTime endDate,
            int? peopleCapacity)
        {
            if (startDate == default || endDate == default || startDate > endDate)
            {
                return BadRequest("Invalid date range. Please provide valid 'startDate' and 'endDate' values.");
            }

            IEnumerable<Room> availableRooms =
                _roomService.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            return Ok(availableRooms);
        }

        /// <summary>
        /// Get list of bookings for current customer
        /// </summary>
        /// <returns></returns>
        [HttpGet("bookings")]
        [Authorize(Roles = Roles.Customer)]
        public IActionResult GetCustomerBookings()
        {
            return Ok(_bookingService.GetAllBookings());
        }

        /// <summary>
        /// Get booking details of current customer
        /// </summary>
        /// <param name="bookingId"></param>
        /// <returns></returns>
        [HttpGet("bookings/{bookingId}")]
        [Authorize(Roles = Roles.Customer)]
        public IActionResult GetBookingDetails([FromRoute] Guid bookingId)
        {
            Booking? booking = _bookingService.GetBookingById(bookingId);
            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        [HttpPost("bookings")]
        [Authorize(Roles = Roles.Customer)]
        public IActionResult CreateBooking([FromBody] Booking booking)
        {
            try
            {
                _bookingService.CreateBooking(booking);
            }
            catch (BookingCreationException ex)
            {
                return BadRequest("Failed to create booking: " + ex.Message);
            }

            return CreatedAtAction(nameof(GetBookingDetails), new { bookingId = booking.BookingId }, booking);
        }

        [HttpDelete("bookings/{bookingId}")]
        [Authorize(Roles = Roles.Customer)]
        public IActionResult CancelBooking([FromRoute] Guid bookingId)
        {
            Booking? booking = _bookingService.GetBookingById(bookingId);
            if (booking == null)
            {
                return NotFound();
            }

            try
            {
                BookingValidator.ValidateCancellation(booking);
                _bookingService.RemoveBookingById(bookingId);
            }
            catch (LessThanThreeDaysLeftException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (BookingRemovalException ex)
            {
                return StatusCode(500, ex.Message);
            }

            return NoContent();
        }
    }
}
