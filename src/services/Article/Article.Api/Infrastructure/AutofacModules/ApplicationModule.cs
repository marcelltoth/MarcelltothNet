using Autofac;
using MarcellTothNet.Services.Article.Api.Queries;
using MarcellTothNet.Services.Article.Domain.TagAggregate;
using MarcellTothNet.Services.Article.Infrastructure.Repositories;

namespace MarcellTothNet.Services.Article.Api.Infrastructure.AutofacModules
{
    public class ApplicationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {

            // Add queries

            builder.RegisterType<TagQueries>()
                .As<ITagQueries>();

            builder.RegisterType<ArticleQueries>()
                .As<IArticleQueries>();
        }
    }
}