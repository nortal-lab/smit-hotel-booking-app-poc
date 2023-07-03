using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
