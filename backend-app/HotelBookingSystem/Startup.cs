using System.Net.Mime;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Data.RoomRepository;

namespace HotelBookingSystem.API
{
    public class Startup
    {
        private readonly IConfigurationRoot _configuration;

        public Startup(IConfigurationRoot configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(_configuration);

            services.AddMvc(options =>
            {
                options.Filters.Add(new ProducesAttribute(MediaTypeNames.Application.Json));
                options.Filters.Add(new ConsumesAttribute(MediaTypeNames.Application.Json));
            });

            services.AddControllers().AddJsonOptions(opts =>
            {
                opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

            services.AddErrorHandling();

            services.AddSwagger();

            // DI
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<IBookingRepository, BookingRepository>();

            services.AddEndpointsApiExplorer();

            // EF Core in-memory DB
            services.AddDbContext<HotelBookingSystemDbContext>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UsePathBase("/api");
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(x => x.MapControllers());

            app.UseSwagger();
            app.UseSwaggerUI();
        }
    }
}
