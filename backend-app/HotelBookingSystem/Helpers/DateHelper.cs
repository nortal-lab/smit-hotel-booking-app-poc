namespace HotelBookingSystem.API.Helpers
{
    public static class DateHelper
    {
        public static DateTime SetStartTimeTo1500(DateTime startDate)
        {
            return new DateTime(startDate.Year, startDate.Month, startDate.Day, 15, 0, 0);
        }

        public static DateTime SetEndTimeTo1200(DateTime endDate)
        {
            return new DateTime(endDate.Year, endDate.Month, endDate.Day, 12, 0, 0);
        }
    }
}
