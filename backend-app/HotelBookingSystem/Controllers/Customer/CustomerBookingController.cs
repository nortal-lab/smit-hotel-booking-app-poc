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

        public CustomerBookingController(IBookingService bookingService, IAuthenticationService authenticationService, IBookingValidator bookingValidator)
        {
            _bookingService = bookingService;
            _bookingValidator = bookingValidator;
            _currentUser = authenticationService.CurrentUser!;
        }

        /// <summary>
        /// Get list of bookings for current customer
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
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
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("")]
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
                return BadRequest(ex.Message);
            }
            catch (BookingDateOverlapException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (BookingCreationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{bookingId}")]
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
                return BadRequest(ex.Message);
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
