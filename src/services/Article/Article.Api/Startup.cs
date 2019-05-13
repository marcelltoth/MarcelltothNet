using System;
using System.Data.Common;
using System.Data.SqlClient;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using MarcellTothNet.Services.Article.Api.Infrastructure.AutofacModules;
using MarcellTothNet.Services.Article.Api.Infrastructure.Filters;
using MarcellTothNet.Services.Article.Api.Infrastructure.Options;
using MarcellTothNet.Services.Article.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MarcellTothNet.Services.Article.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // Add authentication

            var urlConfig = Configuration.GetSection("Authentication").Get<AuthenticationOptions>();

            services.AddAuthentication("jwt").AddJwtBearer("jwt", opts =>
                {
                    opts.Authority = urlConfig.Authority;
                });

            // Add general services

            services.AddMvc(mvcOptions =>
            {
                mvcOptions.Filters.Add<DomainExceptionFilter>();
                mvcOptions.Filters.Add<CheckModelStateFilter>();
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddDbContext<ArticleContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("ArticleDatabase"), opt =>
                    {
                        opt.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName);
                    });
                options.ConfigureWarnings(warnings => warnings.Throw(RelationalEventId.QueryClientEvaluationWarning));
            });
            
            services.AddAutoMapper();

            // Create AutoFac container

            var builder = new ContainerBuilder();

            // Copy the services above into AutoFac and register others


            // Add DB Connection factory
            builder.Register(context => new SqlConnection(Configuration.GetConnectionString("ArticleDatabase")))
                .As<DbConnection>()
                .InstancePerDependency();

            builder.Populate(services);

            builder.RegisterModule<InfrastructureAutofacModule>();

            builder.RegisterModule<MediatorModule>();

            builder.RegisterModule<ApplicationModule>();


            // Build the container

            var container = builder.Build();

            return new AutofacServiceProvider(container);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}