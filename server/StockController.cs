using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class StockController : ControllerBase
{
    private readonly FmpApiService _fmpApiService;

    public StockController(FmpApiService fmpApiService)
    {
        _fmpApiService = fmpApiService;
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search(string query)
    {
        var result = await _fmpApiService.SearchStockSymbolAsync(query);
        return Content(result, "application/json");
    }
}