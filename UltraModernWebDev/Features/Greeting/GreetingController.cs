using System;
using System.Threading.Tasks;
using System.Web.Http;
using MediatR;

namespace UltraModernWebDev.Features.Greeting
{
    public class GreetingController : ApiController
    {
        private readonly IMediator _mediator;

        public GreetingController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("api/greeting")]
        public async Task<Greeting> GetGreeting(Greet greet)
        {
            return await _mediator.SendAsync(greet);

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
