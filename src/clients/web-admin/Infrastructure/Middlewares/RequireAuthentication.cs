using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace MarcellTothNet.Clients.WebAdmin.Infrastructure.Middlewares
{
    /// <summary>
    ///     Middleware that denies access for unauthenticated users.
    ///     This should be placed after the authentication middleware.
    ///     If the user is not authenticated, this middleware shortcuts the pipeline with a challenge to the OpenId Connect provider.
    /// </summary>
    public class RequireAuthenticationMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (!context.User.Identity.IsAuthenticated)
            {
                await context.ChallengeAsync();
                return;
            }

            await next(context);
        }
    }

    public static class RequireAuthenticationExtensions
    {
        /// <summary>
        ///     Enables total denial for unauthenticated users.
        /// </summary>
        public static void UseRequiredAuthentication(this IApplicationBuilder builder)
        {
            builder.UseMiddleware<RequireAuthenticationMiddleware>();
        }
    }
}