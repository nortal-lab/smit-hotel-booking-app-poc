using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Models.Room;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingSystem.API.Data
{
    public class HotelBookingSystemDbContext : DbContext
    {
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Room> Rooms { get; set; }

        public HotelBookingSystemDbContext()
        {
        }

        public HotelBookingSystemDbContext(DbContextOptions<HotelBookingSystemDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseInMemoryDatabase("HotelBookingSystemDb");
        }

        // Add mock data to the in-memory database
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>().HasData(MockData.RoomsHardcoded);

            base.OnModelCreating(modelBuilder);
        }
    }
}
