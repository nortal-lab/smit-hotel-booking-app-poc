using HotelBookingSystem.API.Common;
using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Data
{
    public static class MockData
    {
        public static List<RoomDto> RoomsHardcoded = new()
        {
            new() { RoomId = Guid.NewGuid(), RoomNumber = 101, Capacity = 1, Price = 1.00m },
            new() { RoomId = Guid.NewGuid(), RoomNumber = 102, Capacity = 2, Price = 10.00m },
            new() { RoomId = Guid.NewGuid(), RoomNumber = 103, Capacity = 3, Price = 20.00m },
            new() { RoomId = Guid.NewGuid(), RoomNumber = 201, Capacity = 1, Price = 50.00m },
            new() { RoomId = Guid.NewGuid(), RoomNumber = 202, Capacity = 2, Price = 100.00m }
        };

        public static List<BookingDto> BookingsHardcoded = new()
        {
            new()
            {
                RoomId = RoomsHardcoded.ElementAt(0).RoomId,
                BookingId = Guid.NewGuid(),
                CreationDate = new DateTime(2023, 06, 01),
                StartDate = new DateTime(2023, 09, 12),
                EndDate = new DateTime(2023, 09, 14),
                Status = Status.Confirmed,
            },
            new()
            {
                RoomId = RoomsHardcoded.ElementAt(1).RoomId,
                BookingId = Guid.NewGuid(),
                CreationDate = new DateTime(2023, 06, 05),
                StartDate = new DateTime(2023, 08, 05),
                EndDate = new DateTime(2023, 08, 20),
                Status = Status.Confirmed,
            },
            new()
            {
                RoomId = RoomsHardcoded.ElementAt(2).RoomId,
                BookingId = Guid.NewGuid(),
                CreationDate = new DateTime(2023, 06, 10),
                StartDate = new DateTime(2023, 07, 18),
                EndDate = new DateTime(2023, 07, 23),
                Status = Status.Confirmed,
            }
        };
    }
}
