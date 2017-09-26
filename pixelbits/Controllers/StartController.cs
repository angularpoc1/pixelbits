using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace pixelbits.Controllers
{
    [Authorize]
    public class StartController : Controller
    {
        // GET: Start
        public ActionResult Index()
        {
            Claim displayName = ClaimsPrincipal.Current.FindFirst(ClaimsPrincipal.Current.Identities.First().NameClaimType);
            ViewBag.DisplayName = displayName != null ? displayName.Value : string.Empty;

            //ClaimType, Value, ValueType, Issuer
            Claim localClaim = new Claim(ClaimTypes.Webpage, "http://localhost", ClaimValueTypes.String, "AADGuide");

            //Method 1 - short version
            ClaimsPrincipal.Current.Identities.First().AddClaim(localClaim);

            //Method 2 - slightly longer version
            //var user = User as ClaimsPrincipal;
            //var identity = user.Identity as ClaimsIdentity;
            //identity.AddClaim(localClaim);   
            return View();
        }
    }
}