using HotelBookingSystem.API.Auth.Model;

namespace HotelBookingSystem.API.Auth;

/// <summary>
/// Service provides convenience methods for authentication context.
/// </summary>
public interface IAuthenticationService
{
    /// <summary>
    /// Returns current authenticated user.
    /// </summary>
    public ICurrentUser? CurrentUser { get; }
}
