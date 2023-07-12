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
    [Route("employee")]
    [ApiController]
    [Authorize(Roles = Roles.Employee)]
    public class EmployeeController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IBookingService _bookingService;

        public EmployeeController(IRoomService roomService, IBookingService bookingService)
        {
            _roomService = roomService;
            _bookingService = bookingService;
        }

        [HttpGet("rooms")]
        public IActionResult GetAllRooms()
        {
            return Ok(_roomService.GetAllRooms());
        }

        [HttpGet("bookings/active")]
        public IActionResult FindAllActiveBookings()
        {
            return Ok(_bookingService.FindAllActiveBookings());
        }

        [HttpGet("rooms/available")]
        public IActionResult FindAvailableRoomsByCriteria([FromQuery] DateTime startDate, DateTime endDate,
            int? peopleCapacity)
        {
            IEnumerable<Room> availableRooms =
                _roomService.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            return Ok(availableRooms);
        }

        [HttpDelete("bookings/{bookingId}")]
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
