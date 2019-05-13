using System;
using System.Threading.Tasks;
using IdentityModel.Client;
using MarcellTothNet.Clients.WebAdmin.Contract;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace MarcellTothNet.Clients.WebAdmin.Controllers
{
    [ApiController]
    [Route("api/authentication")]
    public class AuthenticationController : Controller
    {
        private readonly TokenClient _tokenClient;

        public AuthenticationController(TokenClient tokenClient)
        {
            _tokenClient = tokenClient;
        }

        [HttpPost("token")]
        public async Task<IActionResult> CreateNewAccessToken()
        {
            var refreshToken = await HttpContext.GetTokenAsync("refresh_token");
            var response = await _tokenClient.RequestRefreshTokenAsync(refreshToken);
            if (!response.IsError)
            {
                AuthenticateResult info = await HttpContext.AuthenticateAsync();
                info.Properties.StoreTokens(new []
                {
                    new AuthenticationToken
                    {
                        Name = OpenIdConnectParameterNames.IdToken,
                        Value = response.IdentityToken
                    }, 
                    new AuthenticationToken
                    {
                        Name = OpenIdConnectParameterNames.RefreshToken,
                        Value = response.RefreshToken
                    },
                    new AuthenticationToken
                    {
                        Name = OpenIdConnectParameterNames.AccessToken,
                        Value = response.AccessToken
                    }
                });

                await HttpContext.SignInAsync(info.Principal, info.Properties);

                return Ok(new TokensDto
                {
                    AccessToken = response.AccessToken
                });
            }

            throw response.Exception;
        }
    }
}