using System.Reflection;
using Autofac;
using MediatR;
using Module = Autofac.Module;

namespace MarcellTothNet.Services.Article.Api.Infrastructure.AutofacModules
{
    /// <summary>
    ///     Registers services related to the Mediator.
    /// </summary>
    public class MediatorModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Add MeditaR
            builder.RegisterType<Mediator>()
                .As<IMediator>()
                .InstancePerLifetimeScope();

            builder.Register<ServiceFactory>(context =>
            {
                var c = context.Resolve<IComponentContext>();
                return t => c.Resolve(t);
            });

            // Add Command Handlers

            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                .AsClosedTypesOf(typeof(IRequestHandler<>))
                .InstancePerDependency();

            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                .AsClosedTypesOf(typeof(IRequestHandler<,>))
                .InstancePerDependency();

            // Add Domain Event handlers

            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                .AsClosedTypesOf(typeof(INotificationHandler<>))
                .InstancePerDependency();
        }
    }
}