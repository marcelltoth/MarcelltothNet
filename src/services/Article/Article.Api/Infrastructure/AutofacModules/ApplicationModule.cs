using Autofac;
using MarcellTothNet.Services.Article.Api.Queries;

namespace MarcellTothNet.Services.Article.Api.Infrastructure.AutofacModules
{
    public class ApplicationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {

            // Add queries

            builder.RegisterType<TagQueries>()
                .As<ITagQueries>();
        }
    }
}