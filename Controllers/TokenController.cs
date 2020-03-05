using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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

        public class ImisPerson 
        {
            public string ImisId { get; set; }
            public string FirstName { get; set; }
        }

        ImisPerson myImisPerson = new ImisPerson();

        iMISToken myImisToken = new iMISToken();

        //Hosted web API REST Service base url
        string Baseurl = "https://atkvimistesthk.atkv.co.za/ASI.Scheduler_iMIS0/";
       [HttpGet("/getparty/{partyId}")]
        public async Task<ActionResult<ImisPerson>> GetImisPartyById(string partyId)
        {
            //List<Party> EmpInfo = new List<Party>();

            using (var client = new HttpClient())
            {
                //Passing service base url  
                JObject EmpInfo = new JObject();
                string access_token = Request.Cookies["access_token"];
                client.BaseAddress = new Uri(Baseurl);

                client.DefaultRequestHeaders.Clear();
                //Define request data format  
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + access_token);

                //Sending request to find web api REST service resource GetAllEmployees using HttpClient  
                HttpResponseMessage Res = await client.GetAsync("api/party/" + partyId);

                //Checking the response is successful or not which is sent using HttpClient  
                if (Res.IsSuccessStatusCode)
                {
                    //Storing the response details recieved from web api   
                    var EmpResponse = Res.Content.ReadAsStringAsync().Result;

                    //Deserializing the response recieved from web api and storing into the Employee list  
                     EmpInfo =  JObject.Parse(EmpResponse);
                       
                }
                else
                {
                    return NotFound();
                }
                //returning the employee list to view  
                string test = EmpInfo["PartyId"].ToString();
                myImisPerson.FirstName = EmpInfo["Name"].ToString();
                myImisPerson.ImisId = EmpInfo["PartyId"].ToString();
                return Ok(myImisPerson);
            }
        }

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


        [HttpPost("/token")]
        public IActionResult DoSth()
        {
            var sessionToken = Request.Form["refresh_token"];
            HttpContext.Session.SetString("refresh_token", sessionToken);
            //redirect back to home, trying to get request response here causes iMIS server to err 500. 
            return Redirect("/");
        }
        
    }
}
