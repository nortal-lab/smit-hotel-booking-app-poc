namespace HotelBookingSystem.API.Auth.Model;

/// <summary>
/// Currently logged in user.
/// </summary>
public interface ICurrentUser
{
    public string Id { get; }

    public string Email { get; }

    public string? PersonalIdentificationNumber { get; }

    public string FirstName { get; }

    public string LastName { get; }

    public string FullName { get; }
}
