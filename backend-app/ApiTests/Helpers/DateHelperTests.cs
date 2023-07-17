using HotelBookingSystem.API.Helpers;

namespace HotelBookingSystem.API.Tests
{
    [TestFixture]
    public class DateHelperTests
    {
        [Test]
        public void SetStartTimeTo1500_SetsCorrectTime()
        {
            // Arrange
            DateTime inputDate = new DateTime(2023, 7, 17, 10, 0, 0);

            // Act
            DateTime result = DateHelper.SetStartTimeTo1500(inputDate);

            // Assert
            Assert.That(result, Is.EqualTo(new DateTime(2023, 7, 17, 15, 0, 0)));
        }

        [Test]
        public void SetEndTimeTo1200_SetsCorrectTime()
        {
            // Arrange
            DateTime inputDate = new DateTime(2023, 7, 17, 10, 0, 0);

            // Act
            DateTime result = DateHelper.SetEndTimeTo1200(inputDate);

            // Assert
            Assert.That(result, Is.EqualTo(new DateTime(2023, 7, 17, 12, 0, 0)));
        }
    }
}
