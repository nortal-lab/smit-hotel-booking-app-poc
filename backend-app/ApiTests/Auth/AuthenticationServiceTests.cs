using Microsoft.AspNetCore.Http;
using HotelBookingSystem.API.Auth;
using NUnit.Framework;
using Moq;
using HotelBookingSystem.API.Auth.Model;
using System.Security.Claims;

namespace ApiTests.ServiceTests
{
    public class AuthenticationServiceTests
    {
        private AuthenticationService _sut;
        private Mock<IHttpContextAccessor> _httpContextAccessorMock;

        [SetUp]
        public void Setup()
        {
            _httpContextAccessorMock = new Mock<IHttpContextAccessor>();
            _sut = new AuthenticationService(_httpContextAccessorMock.Object);
        }

        [Test]
        public void CurrentUser_ReturnsNull_IfNotAuthenticated()
        {
            // Arrange
            var context = new DefaultHttpContext();
            _httpContextAccessorMock.Setup(x => x.HttpContext).Returns(context);

            // Act
            var result = _sut.CurrentUser;

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public void CurrentUser_ReturnsCurrentUser_IfAuthenticated()
        {
            // Arrange
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "Test User Id"),
                new Claim(ClaimTypes.Email, "test.user@email.com"),
                new Claim(ClaimTypes.Name, "Test User"),
                new Claim(ClaimTypes.GivenName, "Test"),
                new Claim(ClaimTypes.Surname, "User")
            };
            var identity = new ClaimsIdentity(claims, "TestAuthType");
            var context = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(identity)
            };
            _httpContextAccessorMock.Setup(x => x.HttpContext).Returns(context);

            // Act
            var result = _sut.CurrentUser;

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Id, Is.EqualTo("Test User Id"));
            Assert.That(result.Email, Is.EqualTo("test.user@email.com"));
            Assert.That(result.FirstName, Is.EqualTo("Test"));
            Assert.That(result.LastName, Is.EqualTo("User"));
            Assert.That(result.FullName, Is.EqualTo("Test User"));
        }

    }
}
