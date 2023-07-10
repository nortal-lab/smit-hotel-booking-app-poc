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

    public string Id
    {
        get
        {
            return _principal.FindFirst(ClaimTypes.NameIdentifier)!.Value;
        }
    }

    public string Email
    {
        get
        {
            return _principal.FindFirst(ClaimTypes.Email)!.Value;
        }
    }

    public string? PersonalIdentificationNumber
    {
        get
        {
            return _principal.FindFirst(ClaimPersonalIdentificationNumber)?.Value;
        }
    }

    public string FirstName
    {
        get
        {
            return _principal.FindFirst(ClaimTypes.GivenName)!.Value;
        }
    }

    public string LastName
    {
        get
        {
            return _principal.FindFirst(ClaimTypes.Surname)!.Value;
        }
    }

    public string FullName
    {
        get
        {
            return _principal.FindFirst(ClaimTypes.Name)!.Value;
        }
    }
}
