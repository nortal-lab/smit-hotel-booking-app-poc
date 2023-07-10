using HotelBookingSystem.API.Auth.Model;

namespace HotelBookingSystem.API.Auth;

public class AuthenticationService : IAuthenticationService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthenticationService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public ICurrentUser? CurrentUser
    {
        get
        {
            var principal = _httpContextAccessor.HttpContext?.User;
            return principal?.Identity?.IsAuthenticated ?? false
                ? new PrincipalWrapper(principal)
                : null;
        }
    }
}
