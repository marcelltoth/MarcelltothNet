using Microsoft.AspNetCore.Mvc;

namespace SpaAggregator.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return Ok("hello");
        }
    }
}
