using HotelBookingSystem.API.Models.Room;

namespace HotelBookingSystem.API.Data
{
    public static class MockData
    {
        public static List<Room> RoomsHardcoded = new()
        {
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomType = RoomType.Single,
                RoomNumber = 101,
                PricePerNightIncludingTaxes = 22.00m,
                RoomSizeInSquareMeters = 14,
                PeopleCapacity = 1,
                BedsType = RoomBedsType.OneTwin
            },
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomType = RoomType.StandardDouble,
                RoomNumber = 102,
                PricePerNightIncludingTaxes = 10.00m,
                RoomSizeInSquareMeters = 16,
                PeopleCapacity = 2,
                BedsType = RoomBedsType.OneDouble,
            },
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomType = RoomType.StandardTwin,
                RoomNumber = 103,
                PricePerNightIncludingTaxes = 20.00m,
                RoomSizeInSquareMeters = 16,
                PeopleCapacity =2,
                BedsType = RoomBedsType.TwoTwin,
            },
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomType = RoomType.Deluxe,
                RoomNumber = 201,
                PricePerNightIncludingTaxes = 50.00m,
                RoomSizeInSquareMeters = 32,
                PeopleCapacity = 3,
                BedsType = RoomBedsType.OneKingAndOneSofa,
                Balcony = true
            },
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomType = RoomType.Studio,
                RoomNumber = 202,
                PricePerNightIncludingTaxes = 100.00m,
                RoomSizeInSquareMeters = 37,
                PeopleCapacity = 3,
                BedsType = RoomBedsType.OneKingAndOneSofa,
                Balcony = true
            },
            new()
            {
                RoomId = Guid.NewGuid(),
                RoomType = RoomType.Family,
                RoomNumber = 203,
                PricePerNightIncludingTaxes = 110.00m,
                RoomSizeInSquareMeters = 37,
                PeopleCapacity = 3,
                BedsType = RoomBedsType.OneKingAndOneSofa,
                Balcony = true
            }
        };
    }
}
