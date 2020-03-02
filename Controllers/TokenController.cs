using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace imisClientAppStarterKit.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenController : ControllerBase
    {


        public class iMISToken
        {
            public string grant_type { get; set; }
            public string client_id { get; set; }
            public string client_secret { get; set; }

            public string access_token { get; set; }

            public string refresh_token { get; set; }

        }

        iMISToken myImisToken = new iMISToken();

        [HttpGet("/getimistoken")]
        public IActionResult GetImisToken()
        {
            string retToken = HttpContext.Session.GetString("refresh_token");
            if (myImisToken != null)
            {
                JsonResult myResult = new JsonResult(retToken);
                return Ok(myResult);
            }
            else
            {
                return NotFound();

            }
        }

        [HttpGet("/token")]
        public IActionResult JustGet()
        {
            //Empty Get Route for redirecting to HOMEPAGE after token  accidentally getting? 
            //Might need to remove this... is it neccessary?
            return Redirect("/");
        }


        [HttpPost]
        [Route("/token")]
        public IActionResult DoSth()
        {
            var sessionToken = Request.Form["refresh_token"];
            HttpContext.Session.SetString("refresh_token", sessionToken);
            //redirect back to home, trying to get request response here causes iMIS server to err 500. 
            return Redirect("/");
        }
        
    }
}
