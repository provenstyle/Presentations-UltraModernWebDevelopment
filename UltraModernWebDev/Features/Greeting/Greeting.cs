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
            return Task.FromResult(new Greeting {Message = "Yo"});
        }
    }
}