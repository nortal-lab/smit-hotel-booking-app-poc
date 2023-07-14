using HotelBookingSystem.API.Auth.Model;
using HotelBookingSystem.API.Models.Room;
using HotelBookingSystem.API.Services.RoomService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers.Employee
{
    [Route("employee/rooms")]
    [ApiController]
    [Authorize(Roles = Roles.Employee)]
    public class EmployeeRoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public EmployeeRoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        /// <summary>
        /// Get a list of all rooms
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        public IActionResult GetAllRooms()
        {
            return Ok(_roomService.GetAllRooms());
        }

        /// <summary>
        /// Search for available rooms based on given criteria
        /// </summary>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <param name="peopleCapacity"></param>
        /// <returns></returns>
        [HttpGet("available")]
        [ProducesResponseType(typeof(Room), StatusCodes.Status200OK)]
        public IActionResult FindAvailableRoomsByCriteria([FromQuery] DateTime startDate, DateTime endDate,
            int? peopleCapacity)
        {
            return Ok(_roomService.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity));
        }

        // Currently this method has the same implementation as for the customer
        // In the future it might have a different implementation, for example more details, etc.
        /// <summary>
        /// Get details of a particular room
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        [HttpGet("{roomId}")]
        [ProducesResponseType(typeof(Room), StatusCodes.Status200OK)]
        public IActionResult GetRoomDetails([FromRoute] Guid roomId)
        {
            Room? room = _roomService.GetRoomById(roomId);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }
    }
}
