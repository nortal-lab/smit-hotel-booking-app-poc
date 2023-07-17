namespace HotelBookingSystem.API.Services.PricingService
{
    public interface IPricingService
    {
        public decimal CalculateTotalPriceForStayDuration(DateTime startDate, DateTime endDate, decimal pricePerNight);
    }
}
