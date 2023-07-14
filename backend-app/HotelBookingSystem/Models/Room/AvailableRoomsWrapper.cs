namespace HotelBookingSystem.API.Models.Room
{
    public record AvailableRoomsWrapper(
        List<Room> AvailableRooms,
        DateTime StartDate,
        DateTime EndDate
    );
}
