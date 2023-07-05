using System.Net.Mime;
using System.Reflection;
using System.Text.Json.Serialization;
using Hellang.Middleware.ProblemDetails;
using Hellang.Middleware.ProblemDetails.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;

namespace HotelBookingSystem.API
{
    public class Startup
    {
        public Startup(IConfigurationRoot configuration)
        {
            Configuration = configuration;
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                options.Filters.Add(new ProducesAttribute(MediaTypeNames.Application.Json));
                options.Filters.Add(new ConsumesAttribute(MediaTypeNames.Application.Json));
            });

            services.AddProblemDetails(opts =>
            {
                opts.MapToStatusCode<Exception>(StatusCodes.Status500InternalServerError);
            });
            services.AddProblemDetailsConventions();

            services.AddControllers().AddJsonOptions(opts =>
            {
                opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

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

        public void Configure(IApplicationBuilder app)
        {
            app.UsePathBase("/api");
            app.UseRouting();
            app.UseEndpoints(x => x.MapControllers());
        }
    }
}
