using HotelBookingSystem.API.Auth;
using HotelBookingSystem.API.Auth.Model;
using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Services.BookingService;
using HotelBookingSystem.API.Validators.BookingValidator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers.Customer
{
    [Route("bookings")]
    [ApiController]
    [Authorize(Roles = Roles.Customer)]
    public class CustomerBookingController : ControllerBase
    {
        private static object _bookingLock = new();
        private readonly IBookingService _bookingService;
        private readonly ICurrentUser _currentUser;
        private readonly IBookingValidator _bookingValidator;
        private readonly ILogger<CustomerBookingController> _logger;

        public CustomerBookingController(IBookingService bookingService, IAuthenticationService authenticationService, IBookingValidator bookingValidator, ILogger<CustomerBookingController> logger)
        {
            _bookingService = bookingService;
            _bookingValidator = bookingValidator;
            _logger = logger;
            _currentUser = authenticationService.CurrentUser!;
        }

        /// <summary>
        /// Get list of bookings for current customer
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        [ProducesResponseType(typeof(Booking), StatusCodes.Status200OK)]
        public IActionResult GetCustomerBookings()
        {
            return Ok(_bookingService.GetAllCustomerBookings(new Guid(_currentUser.Id)));
        }

        /// <summary>
        /// Get booking details of current customer
        /// </summary>
        /// <param name="bookingId"></param>
        /// <returns></returns>
        [HttpGet("{bookingId}")]
        [ProducesResponseType(typeof(Booking), StatusCodes.Status200OK)]
        public IActionResult GetBookingDetails([FromRoute] Guid bookingId)
        {
            try
            {
                Booking? booking = _bookingService.GetBookingById(bookingId, new Guid(_currentUser.Id));
                if (booking == null)
                {
                    return NotFound();
                }

                return Ok(booking);
            }
            catch (BookingAccessException ex)
            {
                _logger.LogError(ex, "Inaccessible booking exception occurred: {ErrorMessage}", ex.Message);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Allow customer to make a booking.
        /// </summary>
        /// <param name="booking"></param>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(Booking), StatusCodes.Status201Created)]
        public IActionResult CreateBooking([FromBody] Booking booking)
        {
            try
            {
                _bookingValidator.ValidateCreation(booking);

                lock (_bookingLock)
                {
                    _bookingValidator.ValidateDoubleBooking(booking);

                    Booking createdBooking = _bookingService.CreateBooking(booking, _currentUser);
                    return CreatedAtAction(nameof(GetBookingDetails), new { bookingId = createdBooking.BookingId },
                        createdBooking);
                }
            }
            catch (InvalidDateRangeException ex)
            {
                _logger.LogError(ex, "Invalid date range exception occurred: {ErrorMessage}", ex.Message);
                return BadRequest(ex.Message);
            }
            catch (SameNightBookingNotAvailableException ex)
            {
                _logger.LogError(ex, "Same night booking is not available exception occurred: {ErrorMessage}", ex.Message);
                return BadRequest(ex.Message);
            }
            catch (BookingDateOverlapException ex)
            {
                _logger.LogError(ex, "Booking date overlap exception occurred: {ErrorMessage}", ex.Message);
                return BadRequest(ex.Message);
            }
            catch (BookingCreationException ex)
            {
                _logger.LogError(ex, "Booking creation exception occurred: {ErrorMessage}", ex.Message);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Allow customer to cancel their booking
        /// </summary>
        /// <param name="bookingId"></param>
        /// <returns></returns>
        [HttpDelete("{bookingId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult CancelBooking([FromRoute] Guid bookingId)
        {
            try
            {
                Booking? booking = _bookingService.GetBookingById(bookingId, new Guid(_currentUser.Id));
                if (booking == null)
                {
                    return NotFound();
                }

                _bookingValidator.ValidateCancellation(booking);
                _bookingService.RemoveBookingById(bookingId);
            }
            catch (BookingAccessException ex)
            {
                _logger.LogError(ex, "Booking access exception occurred: {ErrorMessage}", ex.Message);
                return BadRequest(ex.Message);
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
