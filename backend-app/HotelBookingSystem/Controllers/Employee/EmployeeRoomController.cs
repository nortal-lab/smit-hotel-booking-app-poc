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

        [HttpGet("")]
        public IActionResult GetAllRooms()
        {
            return Ok(_roomService.GetAllRooms());
        }

        [HttpGet("available")]
        public IActionResult FindAvailableRoomsByCriteria([FromQuery] DateTime startDate, DateTime endDate,
            int? peopleCapacity)
        {
            IEnumerable<Room> availableRooms =
                _roomService.FindAvailableRoomsByCriteria(startDate, endDate, peopleCapacity);

            return Ok(availableRooms);
        }
    }
}
