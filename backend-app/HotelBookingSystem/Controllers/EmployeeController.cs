using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers
{
    public class EmployeeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
