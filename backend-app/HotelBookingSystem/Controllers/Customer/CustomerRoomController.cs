using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Helpers;
using HotelBookingSystem.API.Models.Room;
using HotelBookingSystem.API.Services.PricingService;
using HotelBookingSystem.API.Services.RoomService;
using HotelBookingSystem.API.Validators.BookingValidator;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers.Customer
{
    [Route("rooms")]
    [ApiController]
    public class CustomerRoomController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IBookingValidator _bookingValidator;
        private readonly IPricingService _pricingService;
        private readonly ILogger<CustomerRoomController> _logger;

        public CustomerRoomController(IRoomService roomService,
            IBookingValidator bookingValidator,
            ILogger<CustomerRoomController> logger,
            IPricingService pricingService)
        {
            _roomService = roomService;
            _bookingValidator = bookingValidator;
            _logger = logger;
            _pricingService = pricingService;
        }

        /// <summary>
        /// Search for available rooms based on given criteria
        /// </summary>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <param name="peopleCapacity">Minimal Capacity</param>
        /// <returns>Available rooms matching search criteria</returns>
        [HttpGet("available")]
        [ProducesResponseType(typeof(AvailableRoomsWrapper), StatusCodes.Status200OK)]
        public IActionResult FindAvailableRoomsByCriteria([FromQuery] DateTime startDate, DateTime endDate,
            int? peopleCapacity)
        {
            try
            {
                _bookingValidator.BookingDateRangeValidation(startDate, endDate);
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

            var availableRooms =
                _roomService.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            var availableRoomsWrapper = new AvailableRoomsWrapper
            (
                availableRooms.Select(room => new RoomReadyForBookingWrapper
                        (room, _pricingService.CalculateTotalPriceForStayDuration(startDate, endDate, room.PricePerNightIncludingTaxes))).ToList(),
                DateHelper.SetStartTimeTo1500(startDate),
                DateHelper.SetEndTimeTo1200(endDate)
            );

            return Ok(availableRoomsWrapper);
        }

        /// <summary>
        /// Get details of a particular room
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        [HttpGet("{roomId}")]
        [ProducesResponseType(typeof(Room), StatusCodes.Status200OK)]
        public IActionResult GetRoomDetails([FromRoute] Guid roomId)
        {
            var room = _roomService.GetRoomById(roomId);

            return room == null
                ? NotFound()
                : Ok(room);
        }
    }
}
