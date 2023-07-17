namespace HotelBookingSystem.API.Models.Room
{
    public record RoomReadyForBookingWrapper(
        Room Room,
        decimal TotalPriceForStayDuration
    );
}
