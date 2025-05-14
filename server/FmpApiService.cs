using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

public class FmpApiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public FmpApiService(HttpClient httpClient, IConfiguration configuration)
    {
        Console.WriteLine(httpClient);
        Console.WriteLine(configuration);
        _httpClient = httpClient;
        _apiKey = configuration["FmpApi:ApiKey"];
        Console.WriteLine(_apiKey);
    }

    public async Task<string> SearchStockSymbolAsync(string query)
    {
        var url = $"https://financialmodelingprep.com/api/v3/search?query={query}&apikey={_apiKey}";
        Console.WriteLine(url);
        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
}