using System.Web.Http;

namespace UltraModernWebDev.Features.Greeting
{
    public class GreetingController : ApiController
    {
        [Route("api/greeting")]
        public Greeting GetGreeting()
        {
            return new Greeting
            {
                Message = "Hello"
            };
        }
    }
}
