using System;
using System.Diagnostics;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using System.Web.Routing;
using Castle.MicroKernel;
using Castle.MicroKernel.Lifestyle;
using Castle.MicroKernel.Registration;
using Castle.Windsor;

namespace UltraModernWebDev
{
    public class CastleWindsorConfig
    {
        public static void RegisterCastleWindsor()
        {
            var container = new WindsorContainer();
            container.Register(
                Classes.FromThisAssembly()
                    .BasedOn<IHttpController>()
                    .WithServiceSelf()
                    .LifestyleScoped(typeof(WebRequestScopeAccessor)),
                Classes.FromThisAssembly()
                    .BasedOn<IController>()
                    .WithServiceSelf()
                    .LifestyleScoped(typeof(WebRequestScopeAccessor))
            );
            ControllerBuilder.Current.SetControllerFactory(new WindsorControllerFactory(container.Kernel));
            GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerActivator), new WindsorHttpControllerActivator(container.Kernel));
        }
    }

    class WindsorControllerFactory : DefaultControllerFactory
    {
        private readonly IKernel _kernel;

        public WindsorControllerFactory(IKernel kernel)
        {
            _kernel = kernel;
        }

        [DebuggerStepThrough]
        protected override IController GetControllerInstance(
            RequestContext requestContext,
            Type controllerType)
        {
            if (controllerType == null)
            {
                throw new HttpException(404, string.Format(
                    "The controller for path '{0}' could not be found.",
                    requestContext.HttpContext.Request.Path));
            }
            return (IController)_kernel.Resolve(controllerType);
        }

        public override void ReleaseController(IController controller)
        {
            _kernel.ReleaseComponent(controller);
        }
    }

    class WindsorHttpControllerActivator : IHttpControllerActivator
    {
        private readonly IKernel _kernel;

        public WindsorHttpControllerActivator(IKernel kernel)
        {
            _kernel = kernel;
        }

        public IHttpController Create(
            HttpRequestMessage request,
            HttpControllerDescriptor controllerDescriptor,
            Type controllerType)
        {
            return (IHttpController)_kernel.Resolve(controllerType);
        }
    }
}