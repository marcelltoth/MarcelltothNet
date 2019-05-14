using MarcellTothNet.Services.Files.Api.Misc.Json;
using MarcellTothNet.Services.Files.Api.Options;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

[assembly: ApiController]

namespace MarcellTothNet.Services.Files.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var authenticationOptions = Configuration.GetSection("Authentication").Get<AuthenticationOptions>();

            services.AddAuthentication("jwt").AddJwtBearer("jwt", opts =>
            {
                opts.Authority = authenticationOptions.Authority;
                opts.RequireHttpsMetadata = false;
                opts.TokenValidationParameters.ValidAudience = authenticationOptions.Audience;
                opts.TokenValidationParameters.ValidateIssuer = false;
            });

            services.AddAuthorization(ao =>
            {
                ao.AddPolicy("CanModify", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireRole("Owner");
                });
                
                ao.AddPolicy("CanList", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireRole("Owner");
                });
            });
            
            services.AddControllers()
                .AddNewtonsoftJson(jsonOpts =>
                {
                    jsonOpts.SerializerSettings.Converters.Add(new ByteArrayConverter());
                });

            services.AddDbContext<FilesDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("FilesDatabase"));
                options.ConfigureWarnings(warnings => warnings.Throw(RelationalEventId.QueryClientEvaluationWarning));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}