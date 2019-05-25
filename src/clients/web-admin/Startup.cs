using System.Threading.Tasks;
using IdentityModel.Client;
using MarcellTothNet.Clients.WebAdmin.Infrastructure.Middlewares;
using MarcellTothNet.Clients.WebAdmin.Infrastructure.Options;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MarcellTothNet.Clients.WebAdmin
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });


            var authenticationOptions = Configuration.GetSection("Authentication").Get<AuthenticationOptions>();
            
            services.AddAuthentication(options =>
                {
                    options.DefaultChallengeScheme = "openidc";
                    options.DefaultScheme = "cookies";
                })
                .AddCookie("cookies")
                .AddOpenIdConnect("openidc", options =>
                {
                    options.Authority = authenticationOptions.Authority;
                    options.RequireHttpsMetadata = false;
                    options.ClientSecret = authenticationOptions.ClientSecret;
                    options.ClientId = authenticationOptions.ClientId;
                    options.ResponseType = "code id_token";
                    options.SaveTokens = true;
                    options.Scope.Clear();
                    options.Scope.Add("openid");
                    options.Scope.Add("role");
                    options.Scope.Add("email");
                    options.Scope.Add("articleapi");
                    options.Scope.Add("filesapi");
                    options.Scope.Add("offline_access");
                    options.SignInScheme = "cookies";
                    options.Events = new OpenIdConnectEvents()
                    {
                        OnRemoteFailure = (context) => { return Task.FromResult(0); }
                    };
                });

            services.AddTransient(sp => new TokenClient(authenticationOptions.Authority+"/connect/token", authenticationOptions.ClientId, authenticationOptions.ClientSecret));

            services.AddTransient<RequireAuthenticationMiddleware>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Add authentication here. Non authenticated users should not see this site at all.
            app.UseAuthentication();
            app.UseRequiredAuthentication();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
