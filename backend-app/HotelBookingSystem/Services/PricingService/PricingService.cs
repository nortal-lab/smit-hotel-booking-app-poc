namespace HotelBookingSystem.API.Services.PricingService
{
    public class PricingService : IPricingService
    {
        public decimal CalculateTotalPriceForStayDuration(DateTime startDate, DateTime endDate, decimal pricePerNight)
        {
            int stayDurationInDays = (endDate.Date - startDate.Date).Days;
            return stayDurationInDays * pricePerNight;
        }
    }
}
