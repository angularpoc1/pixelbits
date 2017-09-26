using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SampleOWINApp.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            ViewBag.ClaimsIdentity = System.Threading.Thread.CurrentPrincipal.Identity;
            var claimsIdentity = System.Threading.Thread.CurrentPrincipal.Identity as ClaimsIdentity;
            ViewBag.DisplayName = "John Smith"; //claimsIdentity.Claims.First(c => c.Type == ClaimTypes.GivenName).Value;
            return View();
        }

        public ActionResult LogOff()
        {
            if (User.Identity.IsAuthenticated)
            {
                var owinContext = this.Request.GetOwinContext();
                var authProperties = new AuthenticationProperties();
                authProperties.RedirectUri = new Uri(this.HttpContext.Request.Url, new UrlHelper(this.ControllerContext.RequestContext).Action("PostLogOff")).AbsoluteUri;
                owinContext.Authentication.SignOut(authProperties);
                return View();
            }
            else
            {
                throw new InvalidOperationException("User is not authenticated");
            }
        }

        public async Task<ActionResult> AuthenticateAsync()
        {
            ClaimsPrincipal incomingPrincipal = System.Threading.Thread.CurrentPrincipal as ClaimsPrincipal;
            if (incomingPrincipal != null && incomingPrincipal.Identity.IsAuthenticated == true)
            {
                ClaimsIdentity claimsIdentity = incomingPrincipal.Identity as ClaimsIdentity;

                if (!claimsIdentity.HasClaim(ClaimTypes.Role, "Admin"))
                {
                    claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "Admin", ClaimValueTypes.String, "AADGuide"));
                    var ctx = Request.GetOwinContext();
                    var authenticationManager = ctx.Authentication;
                    
                    AuthenticateResult authResult = await authenticationManager.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationType);
                    authenticationManager.SignIn(authResult.Properties,claimsIdentity);
                }

            }
            return RedirectToAction("Index", "Start");

        }

        [AllowAnonymous]
        public ActionResult PostLogOff()
        {
            return View();
        }
    }
}