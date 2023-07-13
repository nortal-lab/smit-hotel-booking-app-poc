using HotelBookingSystem.API.Auth.Model;
using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Services.BookingService;
using HotelBookingSystem.API.Validators.BookingValidator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers.Employee
{
    [Route("employee/bookings")]
    [ApiController]
    [Authorize(Roles = Roles.Employee)]
    public class EmployeeBookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IBookingValidator _bookingValidator;

        public EmployeeBookingController(IBookingService bookingService, IBookingValidator bookingValidator)
        {
            _bookingService = bookingService;
            _bookingValidator = bookingValidator;
        }

        [HttpGet("active")]
        public IActionResult FindAllActiveBookings()
        {
            return Ok(_bookingService.FindAllActiveBookings());
        }

        [HttpDelete("{bookingId}")]
        public IActionResult CancelBooking([FromRoute] Guid bookingId)
        {
            Booking? booking = _bookingService.GetBookingById(bookingId);
            if (booking == null)
            {
                return NotFound();
            }

            try
            {
                _bookingValidator.ValidateCancellation(booking);
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
