using HotelBookingSystem.API.Exceptions;
using HotelBookingSystem.API.Models.Room;
using HotelBookingSystem.API.Services.RoomService;
using HotelBookingSystem.API.Validators;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers.Customer
{
    [Route("rooms")]
    [ApiController]
    public class CustomerRoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public CustomerRoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        /// <summary>
        /// Search for available rooms
        /// </summary>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <param name="peopleCapacity">Minimal Capacity</param>
        /// <returns>Available rooms matching search criteria</returns>
        [HttpGet("available")]
        public IActionResult FindAvailableRoomsByCriteria([FromQuery] DateTime startDate, DateTime endDate,
            int? peopleCapacity)
        {
            try
            {
                DateValidator.DateRangeValidation(startDate, endDate);
            }
            catch (InvalidDateRangeException ex)
            {
                return BadRequest(ex.Message);
            }

            IEnumerable<Room> availableRooms =
                _roomService.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            return Ok(availableRooms);
        }
    }
}
