using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace pixelbits.Services
{
    [Authorize]    
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        [HttpGet]
        [Route("ping")]
        public JsonResult<dynamic> Ping()
        {
            return Json<dynamic>(new { result="Pong!" }); 
        }
    }
}
