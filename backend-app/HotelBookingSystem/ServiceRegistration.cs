using System.Reflection;
using Hellang.Middleware.ProblemDetails;
using Hellang.Middleware.ProblemDetails.Mvc;
using HotelBookingSystem.API.Auth;
using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Data.BookingRepository;
using HotelBookingSystem.API.Data.RoomRepository;
using HotelBookingSystem.API.Services.BookingService;
using HotelBookingSystem.API.Services.PricingService;
using HotelBookingSystem.API.Services.RoomService;
using HotelBookingSystem.API.Validators.BookingValidator;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

namespace HotelBookingSystem.API;

/// <summary>
/// Service registration convenience extensions.
/// </summary>
public static class ServiceRegistration
{
    /// <summary>
    /// Configures JWT authentication.
    /// </summary>
    public static void AddAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(o =>
            {
                o.Authority = configuration["Jwt:Authority"];
                o.Audience = configuration["Jwt:Audience"];
                o.SaveToken = true;

                o.RequireHttpsMetadata = false; // For testing ONLY!
                o.TokenValidationParameters.ValidateIssuer = false; // For testing ONLY!
            });
    }

    /// <summary>
    /// Configures application services.
    /// </summary>
    public static void AddApplicationServices(this IServiceCollection services)
    {
        // DI
        services.AddHttpContextAccessor();
        services.AddTransient<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IRoomRepository, RoomRepository>();
        services.AddScoped<IBookingRepository, BookingRepository>();
        services.AddScoped<IRoomService, RoomService>();
        services.AddScoped<IBookingService, BookingService>();
        services.AddScoped<IBookingValidator, BookingValidator>();
        services.AddScoped<IPricingService, PricingService>();
    }

    /// <summary>
    /// Configures EF Core in-memory DB.
    /// </summary>
    public static void AddPersistence(this IServiceCollection services)
    {
        services.AddDbContext<HotelBookingSystemDbContext>();
    }

    /// <summary>
    /// Configures error handling using Problem Details.
    /// </summary>
    public static void AddErrorHandling(this IServiceCollection services)
    {
        services.AddProblemDetails(opts =>
        {
            opts.MapToStatusCode<Exception>(StatusCodes.Status500InternalServerError);
        });
        services.AddProblemDetailsConventions();
    }

    /// <summary>
    /// Configures Swagger API documentation.
    /// </summary>
    public static void AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc(
                "v1",
                new OpenApiInfo
                {
                    Title = "Hotel Booking System POC", Version = "v1", Description = "Hotel Booking System POC"
                });
            c.AddSecurityDefinition(
                "Bearer",
                new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = @"Authorization header using the Bearer scheme.
                                    <br>Enter token in the text input below <i>(Do not enter word 'Bearer')</i>.",
                    Name = "auth-access-token",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer"
                });
            c.AddSecurityRequirement(
                new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference =
                                new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });

            string xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            string xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);
            c.UseAllOfToExtendReferenceSchemas();
        });
    }
}
