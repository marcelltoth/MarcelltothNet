﻿using System.Collections.Generic;
using System.Security.Claims;
using Identity.Api.Options;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace Identity.Api
{
    public class Config
    {
        public static IEnumerable<TestUser> GetTestUsers(string myPassword)
        {
            yield return new TestUser
            {
                IsActive = true,
                Username = "marcell",
                Password = myPassword,
                SubjectId = "1234",
                Claims =
                {
                    new Claim(JwtClaimTypes.Address, "Wherever Hungary"),
                    new Claim(JwtClaimTypes.Email, "marcell@marcelltoth.net"),
                    new Claim(JwtClaimTypes.Role, "Owner")
                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            yield return new IdentityResources.OpenId();
            yield return new IdentityResources.Profile();
            yield return new IdentityResources.Email();
            yield return new IdentityResource("role", new [] { JwtClaimTypes.Role });
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            yield return new ApiResource("articleapi", "Articles API")
            {
                UserClaims = { JwtClaimTypes.ClientId, JwtClaimTypes.Subject, JwtClaimTypes.Email, JwtClaimTypes.Role },
                Scopes = new List<Scope>
                {
                    new Scope("articleapi")
                }
            };
            
            yield return new ApiResource("filesapi", "Static Files API")
            {
                UserClaims = { JwtClaimTypes.ClientId, JwtClaimTypes.Role },
                Scopes = new List<Scope>
                {
                    new Scope("filesapi")
                }
            };
        }

        public static IEnumerable<Client> GetClients(ClientOptions webAdminOptions)
        {
            yield return new Client
            {
                ClientId = "web-admin",
                ClientSecrets =
                {
                    new Secret(webAdminOptions.Secret.Sha512())
                },
                Enabled = true,
                ClientName = "Administrator SPA Application",
                AllowOfflineAccess = true,
                AlwaysIncludeUserClaimsInIdToken = true,
                AllowedGrantTypes = GrantTypes.Hybrid,
                AllowAccessTokensViaBrowser = true,
                AccessTokenType = AccessTokenType.Jwt,
                AccessTokenLifetime = 3600,
                RefreshTokenUsage = TokenUsage.ReUse,
                RefreshTokenExpiration = TokenExpiration.Sliding,
                SlidingRefreshTokenLifetime = 3600*24*365*5,
                RedirectUris = {$"{webAdminOptions.BaseUrl}/signin-oidc"},
                AllowedCorsOrigins = { webAdminOptions.BaseUrl },
                PostLogoutRedirectUris = { $"{webAdminOptions.BaseUrl}/signout-callback-oidc" },
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.Email,
                    "role",
                    "articleapi",
                    "filesapi",
                    IdentityServerConstants.StandardScopes.OfflineAccess
                },
                RequireConsent = false
            };
        }
    }
}