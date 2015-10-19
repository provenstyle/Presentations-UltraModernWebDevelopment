using System;
using System.Threading.Tasks;
using MediatR;

namespace UltraModernWebDev.Features.Greeting
{
    public class Greet : IAsyncRequest<Greeting>
    {
        
    }

    public class Greeting
    {
        public string Message { get; set; }
    }

    public class GreetHandler : IAsyncRequestHandler<Greet, Greeting>
    {
        public Task<Greeting> Handle(Greet message)
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

            return Task.FromResult(new Greeting
            {
                Message = messages[new Random().Next(0, messages.Length)]
            });
        }
    }
}