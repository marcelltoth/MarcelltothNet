using Autofac;
using MarcellTothNet.Services.Article.Domain.ArticleAggregate;
using MarcellTothNet.Services.Article.Domain.TagAggregate;
using MarcellTothNet.Services.Article.Infrastructure.Repositories;

namespace MarcellTothNet.Services.Article.Infrastructure
{
    public class InfrastructureAutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<ArticleRepository>()
                .As<IArticleRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<TagRepository>()
                .As<ITagRepository>()
                .InstancePerLifetimeScope();
        }
    }
}