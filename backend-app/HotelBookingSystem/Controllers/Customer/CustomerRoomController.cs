using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Helpers;
using HotelBookingSystem.API.Models.Room;
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

        public CustomerRoomController(IRoomService roomService, IBookingValidator bookingValidator)
        {
            _roomService = roomService;
            _bookingValidator = bookingValidator;
        }

        /// <summary>
        /// Search for available rooms
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
                return BadRequest(ex.Message);
            }

            var availableRooms =
                _roomService.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            var availableRoomsWrapper = new AvailableRoomsWrapper
            (
                availableRooms.ToList(),
                DateHelper.SetStartTimeTo1500(startDate),
                DateHelper.SetEndTimeTo1200(endDate)
            );

            return Ok(availableRoomsWrapper);
        }

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
