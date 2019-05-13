namespace MarcellTothNet.Clients.WebAdmin.Infrastructure.Options
{
    /// <summary>
    ///     Configuration class to holds the information needed to contact the OpenID Connect provider.
    /// </summary>
    public class AuthenticationOptions
    {
        /// <summary>
        ///     The authority of the OpenID Connect provider
        /// </summary>
        public string Authority { get; set; }

        
        public string ClientSecret { get; set; }
    }
}