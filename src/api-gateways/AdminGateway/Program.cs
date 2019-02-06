using System.IO;
using System.Reflection;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MarcellTothNet.ApiGateways.AdminGateway
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = new WebHostBuilder()
                .UseKestrel((context, kestrelOptions) =>
                {
                    kestrelOptions.Configure(context.Configuration.GetSection("Kestrel"));
                })
                .UseWebRoot(Directory.GetCurrentDirectory())
                .UseConfiguration(new ConfigurationBuilder().AddCommandLine(args).Build())
                .ConfigureLogging(l =>
                {
                    l.AddDebug();
                    l.AddConsole();
                })
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.SetBasePath(hostingContext.HostingEnvironment.WebRootPath)
                        .AddJsonFile("appsettings.json")
                        .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true)
                        .AddJsonFile("ocelot.json", false, true)
                        .AddJsonFile($"ocelot.{hostingContext.HostingEnvironment.EnvironmentName}.json",true, true)
                        .AddEnvironmentVariables();

                    if (hostingContext.HostingEnvironment.IsDevelopment())
                    {
                        Assembly assembly = Assembly.Load(new AssemblyName(hostingContext.HostingEnvironment.ApplicationName));
                        if (assembly != null)
                            config.AddUserSecrets(assembly, true);
                    }

                    if (args != null)
                        config.AddCommandLine(args);
                })
                .UseStartup<Startup>();

            builder.Build().Run();
        }
    }
}
