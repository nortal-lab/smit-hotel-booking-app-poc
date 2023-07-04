using HotelBookingSystem.API.Common;
using HotelBookingSystem.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        public static List<RoomDto> mockRoomsHarcoded = new List<RoomDto>
        {
            new() { RoomId = Guid.NewGuid(), RoomNumber = 101, Capacity = 1, Price = 1.00m },
            new() { RoomId = Guid.NewGuid(), RoomNumber = 102, Capacity = 2, Price = 10.00m },
            new() { RoomId = Guid.NewGuid(), RoomNumber = 103, Capacity = 3, Price = 20.00m },
            new() { RoomId = Guid.NewGuid(), RoomNumber = 201, Capacity = 1, Price = 50.00m },
            new() { RoomId = Guid.NewGuid(), RoomNumber = 202, Capacity = 2, Price = 100.00m }
        };
        public static List<BookingDto> mockBookingsHardcoded = new List<BookingDto>
        {
            new()
            {
                RoomId = mockRoomsHarcoded.ElementAt(0).RoomId,
                BookingId = Guid.NewGuid(),
                CreationDate = new DateTime(2023, 06, 01),
                StartDate = new DateTime(2023, 08, 01),
                EndDate = new DateTime(2023, 08, 02),
                Status = Status.Confirmed,
            },
            new()
            {
                RoomId =mockRoomsHarcoded.ElementAt(1).RoomId,
                BookingId = Guid.NewGuid(),
                CreationDate = new DateTime(2023, 06, 02),
                StartDate = new DateTime(2023, 07, 02),
                EndDate = new DateTime(2023, 07, 04),
                Status = Status.Confirmed,
            },
            new()
            {
                RoomId =mockRoomsHarcoded.ElementAt(2).RoomId,
                BookingId = Guid.NewGuid(),
                CreationDate = new DateTime(2023, 06, 03),
                StartDate = new DateTime(2023, 07, 05),
                EndDate = new DateTime(2023, 07, 10),
                Status = Status.Confirmed,
            }
        };

        [HttpGet("rooms/available")]
        public IActionResult FindAvailableRoomsByCriteria([FromQuery] DateTime startDate, DateTime endDate, decimal? priceMin, decimal? priceMax, int? capacity)
        {
            //ToDo: Implement filtering logic
            //var availableRooms = mockRoomsHarcoded.Where(room =>
            //    (capacity == null || room.Capacity >= capacity) &&
            //    (priceMin == null || room.Price >= priceMin) &&
            //    (priceMax == null || room.Price <= priceMax) &&
            //    !mockBookingsHardcoded.Any(booking =>
            //        booking.RoomId == room.RoomId &&
            //        !(startDate >= booking.EndDate || endDate <= booking.StartDate)
            //    )
            //).ToList();

            return Ok(mockRoomsHarcoded.FirstOrDefault());
        }

        [HttpGet("bookings")]
        public IActionResult GetCustomerBookings()
        {
            return Ok(mockBookingsHardcoded);
        }

        [HttpGet("bookings/{bookingId}")]
        public IActionResult GetBookingDetails([FromRoute] Guid bookingId)
        {
            BookingDto booking = GetBookingObject(bookingId);

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        [HttpPost("bookings")]
        public IActionResult CreateBooking([FromBody] BookingDto bookingDto)
        {
            // If needed, do something with the bookingDto, like maybe validation, saving to db, etc.

            return CreatedAtAction(nameof(GetBookingDetails), new { bookingId = bookingDto.BookingId }, bookingDto);
        }

        [HttpDelete("bookings/{bookingId}")]
        public IActionResult CancelBooking([FromRoute] Guid bookingId)
        {
            var booking = GetBookingObject(bookingId);

            if (booking == null)
            {
                return NotFound();
            }

            var canBeCancelled = ValidateBookingCancelation(booking);
            if (!canBeCancelled)
            {
                // Return a 500 Internal Server Error if the cancellation fails
                return StatusCode(500, "Booking cancellation failed: too close to booking start date.");
            }

            var isCancelled = DeleteBookingById(bookingId);
            if (!isCancelled)
            {
                // Return a 500 Internal Server Error if the cancellation fails
                return StatusCode(500, "Booking cancellation failed.");
            }

            // Return a 204 No Content response (successful cancellation)
            return NoContent();
        }

        private bool DeleteBookingById(Guid bookingId)
        {
            var itemsRemovedCount = mockBookingsHardcoded.RemoveAll(booking => booking.BookingId == bookingId);

            if (itemsRemovedCount > 0)
            {
                return true;
            }

            return false;
        }

        // Business rule: cannot be cancelled if fewer than 3 days left before start
        private bool ValidateBookingCancelation(BookingDto booking)
        {
            if (booking.StartDate.AddDays(-3) < DateTime.Now)
            {
                return false;
            }

            return true;
        }

        private static BookingDto GetBookingObject(Guid bookingId)
        {
            return mockBookingsHardcoded.SingleOrDefault(booking => booking.BookingId == bookingId);
        }
    }
}
