using System.Security.Claims;

namespace HotelBookingSystem.API.Auth.Model;

public class PrincipalWrapper : ICurrentUser
{
    private const string ClaimPersonalIdentificationNumber = "personal_identification_number";

    private readonly ClaimsPrincipal _principal;

    public PrincipalWrapper(ClaimsPrincipal principal)
    {
        _principal = principal ?? throw new ArgumentNullException(nameof(principal));
    }

    public string Id => _principal.FindFirst(ClaimTypes.NameIdentifier)!.Value;
    public string Email => _principal.FindFirst(ClaimTypes.Email)!.Value;
    public string? PersonalIdentificationNumber => _principal.FindFirst(ClaimPersonalIdentificationNumber)?.Value;

    public string FirstName => _principal.FindFirst(ClaimTypes.GivenName)!.Value;
    public string LastName => _principal.FindFirst(ClaimTypes.Surname)!.Value;
    public string FullName => _principal.FindFirst(ClaimTypes.Name)!.Value;
}
