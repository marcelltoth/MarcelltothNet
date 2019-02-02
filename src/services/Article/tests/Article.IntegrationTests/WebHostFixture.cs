using System;
using MarcellTothNet.Services.Article.Api;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MarcellTothNet.Services.Article.IntegrationTests
{
    /// <summary>
    ///     Provides an <see cref="IWebHost"/> fixture that has been built using the <see cref="Startup"/> class of the SUT.
    /// </summary>
    public class WebHostFixture : IDisposable
    {
        public IWebHost Host { get; }

        public WebHostFixture()
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("testappsettings.json")
                .Build();
            Host = new WebHostBuilder().UseConfiguration(configuration).ConfigureTestServices(ConfigureTestServices).UseStartup<Startup>().Build();
        }

        private void ConfigureTestServices(IServiceCollection services)
        {

        }

        public void Dispose()
        {
            Host.Dispose();
        }
    }
}