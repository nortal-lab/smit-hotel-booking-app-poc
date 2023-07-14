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
        private readonly ILogger<EmployeeBookingController> _logger;

        public EmployeeBookingController(IBookingService bookingService, IBookingValidator bookingValidator, ILogger<EmployeeBookingController> logger)
        {
            _bookingService = bookingService;
            _bookingValidator = bookingValidator;
            _logger = logger;
        }

        /// <summary>
        /// Find all bookings that are currently ongoing (end date is present or future)
        /// </summary>
        /// <returns></returns>
        [HttpGet("active")]
        [ProducesResponseType(typeof(Booking), StatusCodes.Status200OK)]
        public IActionResult FindAllActiveBookings()
        {
            return Ok(_bookingService.FindAllActiveBookings());
        }

        /// <summary>
        /// Allow employee to cancel booking of any customer
        /// </summary>
        /// <param name="bookingId"></param>
        /// <returns></returns>
        [HttpDelete("{bookingId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
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
                _logger.LogError(ex,
                    "Attempting to cancel a booking less than three days before start exception occurred: {ErrorMessage}",
                    ex.Message);
                return BadRequest(ex.Message);
            }
            catch (BookingRemovalException ex)
            {
                _logger.LogError(ex, "Booking removal exception occurred: {ErrorMessage}", ex.Message);
                return StatusCode(500, ex.Message);
            }

            return NoContent();
        }
    }
}
