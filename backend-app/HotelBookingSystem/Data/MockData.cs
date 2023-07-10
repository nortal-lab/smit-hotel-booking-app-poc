using HotelBookingSystem.API.Common;
using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Data
{
    public static class MockData
    {
        public static List<Room> RoomsHardcoded = new()
        {
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomNumber = 101,
                PricePerNight = 22.00m,
                RoomSizeInSquareMeters = 20,
                Capacity = 1,
                NumberOfBeds = 1,
                IncludedTv = true
            },
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomNumber = 102,
                PricePerNight = 10.00m,
                RoomSizeInSquareMeters = 30,
                Capacity = 2,
                NumberOfBeds = 2,
                IncludedTv = false
            },
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomNumber = 103,
                PricePerNight = 20.00m,
                RoomSizeInSquareMeters = 50,
                Capacity = 3,
                NumberOfBeds = 3,
                IncludedTv = false
            },
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomNumber = 201,
                PricePerNight = 50.00m,
                RoomSizeInSquareMeters = 25,
                Capacity = 1,
                NumberOfBeds = 1,
                IncludedTv = true
            },
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomNumber = 202,
                PricePerNight = 100.00m,
                RoomSizeInSquareMeters = 60,
                Capacity = 2,
                NumberOfBeds = 1,
                IncludedTv = true
            }
        };
        public static List<Booking> BookingsHardcoded = new()
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
