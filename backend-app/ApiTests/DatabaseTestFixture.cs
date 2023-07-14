using HotelBookingSystem.API.Data;
using Microsoft.EntityFrameworkCore;

namespace ApiTests
{
    public class DatabaseTestFixture
    {
        public static HotelBookingSystemDbContext SetupDatabase()
        {
            var options = new DbContextOptionsBuilder<HotelBookingSystemDbContext>()
                .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
                .Options;

            return new HotelBookingSystemDbContext(options);
        }
    }
}
