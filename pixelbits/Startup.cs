using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.WsFederation;
using System.Configuration;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;

[assembly: OwinStartup(typeof(pixelbits.Startup))]
namespace pixelbits
{
    public class Startup
    {
        private string wtrealm = ConfigurationManager.AppSettings.Get("Wtrealm");
        private string metadataAddress = ConfigurationManager.AppSettings.Get("MetadataAddress");
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            ConfigureAuth(app);
        }

        public void ConfigureAuth(IAppBuilder app)
        {
            app.UseCookieAuthentication(
                new CookieAuthenticationOptions
                {
                    AuthenticationType =
                       CookieAuthenticationDefaults.AuthenticationType,
                    //ExpireTimeSpan = TimeSpan.FromSeconds(1),
                    //SlidingExpiration = false
                });
            app.UseWsFederationAuthentication(
                new WsFederationAuthenticationOptions
                {
                    MetadataAddress = this.metadataAddress,
                    Wtrealm = this.wtrealm,
                    //UseTokenLifetime = false

                });

            //app.UseClaimsTransformation();

            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);
        }
    }

    public static class AppBuilderExtensions
    {
        public static IAppBuilder UseClaimsTransformation(this IAppBuilder app)
        {
            app.Use(typeof(ClaimsTransformationMiddleware));
            return app;
        }
    }

    public class ClaimsTransformationMiddleware
    {
        readonly Func<IDictionary<string, object>, Task> _next;

        public ClaimsTransformationMiddleware(Func<IDictionary<string, object>, Task> next)
        {
            _next = next;
        }

        public async Task Invoke(IDictionary<string, object> env)
        {
            ClaimsPrincipal incomingPrincipal = Thread.CurrentPrincipal as ClaimsPrincipal;
            if (incomingPrincipal != null && incomingPrincipal.Identity.IsAuthenticated == true)
            {
                ClaimsIdentity claimsIdentity = incomingPrincipal.Identity as ClaimsIdentity;

                ((ClaimsIdentity)incomingPrincipal.Identity).AddClaim(new Claim(ClaimTypes.Role, "Admin", ClaimValueTypes.String, "AADGuide"));

               
                Thread.CurrentPrincipal = incomingPrincipal;
            }
            await _next(env);
        }
    }
}
