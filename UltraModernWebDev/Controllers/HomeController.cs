using System.Web.Mvc;

namespace UltraModernWebDev.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}