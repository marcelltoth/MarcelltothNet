using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace WebHostConfiguration
{
    /// <summary>
    ///     Extension methods that run on the already-built <see cref="IWebHost"/> instance.
    /// </summary>
    public static class WebHostExtensions
    {
        /// <summary>
        ///     Applies migrations to the database <typeparamref name="TContextType"/> is configured to use.
        /// </summary>
        /// <typeparam name="TContextType">The DB context type, inheriting from <see cref="DbContext"/>. Needs to be a registered service.</typeparam>
        /// <returns>Returns <paramref name="host"/>.</returns>
        public static IWebHost ApplyMigrations<TContextType>(this IWebHost host)
            where TContextType : DbContext
        {
            // Create a scope so the IoC container can clean up after this unit of work.
            using (var scope = host.Services.CreateScope())
            {
                // Look up the dbcontext in question and apply migrations.

                DbContext context = scope.ServiceProvider.GetRequiredService<TContextType>();

                context.Database.Migrate();
            }

            return host;
        }
    }
}
