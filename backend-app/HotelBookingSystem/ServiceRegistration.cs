using System.Reflection;
using Hellang.Middleware.ProblemDetails;
using Hellang.Middleware.ProblemDetails.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace HotelBookingSystem.API;

public static class ServiceRegistration
{
    public static void AddAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(o =>
            {
                o.RequireHttpsMetadata = false;
                o.Authority = configuration["Jwt:Authority"];
                o.Audience = configuration["Jwt:Audience"];
                o.SaveToken = true;
                o.TokenValidationParameters.ValidateIssuer = false;
            });
    }

    public static void AddErrorHandling(this IServiceCollection services)
    {
        services.AddProblemDetails(opts =>
        {
            opts.MapToStatusCode<Exception>(StatusCodes.Status500InternalServerError);
        });
        services.AddProblemDetailsConventions();
    }

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
