using Microsoft.AspNetCore.Mvc;
using System.Web;
using System;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.Cors;

namespace web3.Controllers
{
    //[DisableCors]
    [ApiController]
    [Route("[controller]")]
    public class ClienteController : ControllerBase
    {
        //[EnableCors("policy1")]
        [HttpGet]
        [Route("Listar")]

        public async Task<IEnumerable<string>> Listar()
        {
            var result = await GetExternalResponse();

            return new string[] { result, "value2" };

        }

        private async Task<string> GetExternalResponse()
        {
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync("https://qastudiof.myvtex.com/api/catalog_system/pub/products/search");
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadAsStringAsync();
            return result;
        }

    }
}
