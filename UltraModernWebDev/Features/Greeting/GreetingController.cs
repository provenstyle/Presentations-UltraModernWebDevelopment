using System;
using System.Web.Http;

namespace UltraModernWebDev.Features.Greeting
{
    public class GreetingController : ApiController
    {
        [Route("api/greeting")]
        public Greeting GetGreeting()
        {
            var messages = new[]
            {
                "Hello",
                "Howdy",
                "Hola",
                "Hi",
                "Shalom",
                "Bonjour"
            };

            return new Greeting
            {
                Message = messages[new Random().Next(0, messages.Length)]
            };
        }
    }
}
