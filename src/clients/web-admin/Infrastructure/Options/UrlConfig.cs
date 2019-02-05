namespace MarcellTothNet.Clients.WebAdmin.Infrastructure.Options
{
    /// <summary>
    ///     Configuration class to hold the addresses of the surrounding services.
    /// </summary>
    public class UrlConfig
    {
        /// <summary>
        ///     The authority of the OpenID Connect provider
        /// </summary>
        public string IdentityApi { get; set; }
    }
}