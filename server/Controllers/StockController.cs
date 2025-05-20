using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace QuantWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public StockController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        [HttpGet("search/{symbol}")]
        public async Task<IActionResult> SearchStock(string symbol)
        {
            var apiKey = _configuration["FmpApi:ApiKey"];
            var client = _httpClientFactory.CreateClient();
            
            var response = await client.GetAsync($"https://financialmodelingprep.com/api/v3/search?query={symbol}&limit=10&apikey={apiKey}");
            Console.WriteLine(response);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return Ok(content);
            }
            
            return StatusCode((int)response.StatusCode);
        }

        [HttpGet("historical/{symbol}")]
        public async Task<IActionResult> GetHistoricalData(string symbol)
        {
            var apiKey = _configuration["FmpApi:ApiKey"];
            var client = _httpClientFactory.CreateClient();
            
            var response = await client.GetAsync($"https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?apikey={apiKey}");
            Console.WriteLine(response);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return Ok(content);
            }
            
            return StatusCode((int)response.StatusCode);
        }
    }
} 