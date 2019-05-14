namespace MarcellTothNet.Services.Files.Api.Options
{
    public class AuthenticationOptions
    {
        /// <summary>
        ///     The authority of the OpenID Connect provider
        /// </summary>
        public string Authority { get; set; }

        /// <summary>
        ///     The audience name of this API
        /// </summary>
        public string Audience { get; set; }
    }
}