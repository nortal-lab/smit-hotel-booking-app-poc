namespace HotelBookingSystem.API.Models.Room
{
    public record AvailableRoomsWrapper(
        List<RoomReadyForBookingWrapper> AvailableRooms,
        DateTime StartDate,
        DateTime EndDate
    );
}
