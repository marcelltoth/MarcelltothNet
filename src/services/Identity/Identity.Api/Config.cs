using System.Collections.Generic;
using System.Security.Claims;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace Identity.Api
{
    public class Config
    {
        public static IEnumerable<TestUser> GetTestUsers()
        {
            yield return new TestUser
            {
                IsActive = true,
                Username = "marcell",
                Password = "marcell",
                SubjectId = "1234",
                Claims =
                {
                    new Claim(JwtClaimTypes.Address, "Wherever Hungary"),
                    new Claim(JwtClaimTypes.Email, "marcell@marcelltoth.net")
                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            yield return new IdentityResources.OpenId();
            yield return new IdentityResources.Profile();
            yield return new IdentityResources.Email();
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            yield return new ApiResource("api-article", "Articles API")
            {
                UserClaims = { JwtClaimTypes.ClientId, JwtClaimTypes.Subject, JwtClaimTypes.Email }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            yield return new Client()
            {
                ClientId = "admin-spa",
                ClientName = "Administrator SPA Application",
                AllowedGrantTypes = GrantTypes.Implicit,
                AllowAccessTokensViaBrowser = true,
                RedirectUris = {},
                AllowedCorsOrigins = {},
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.Email,
                }
            };
        }
    }
}