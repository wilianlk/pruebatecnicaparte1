using Microsoft.AspNetCore.Mvc;
using System.Web;
using System;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.Cors;

namespace web3.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ClienteController : ControllerBase
    {
        [HttpGet]
        [Route("Listar")]

        public async Task<string> Listar()
        {
            var client = new HttpClient();
            string response = await client.GetStringAsync("https://qastudiof.myvtex.com/api/catalog_system/pub/products/search/?fq=productId:5068");

            return response;
            

        }

        private async Task<string> GetExternalResponse()
        {
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync("https://qastudiof.myvtex.com/api/catalog_system/pub/products/search/?fq=productId:5068");
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadAsStringAsync();
            return result;
        }

    }
}
