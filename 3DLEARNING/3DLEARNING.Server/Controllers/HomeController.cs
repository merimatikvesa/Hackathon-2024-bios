using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API.Completions;
using OpenAI_API;
using System.Threading.Tasks;
using OpenAI_API.Chat;

namespace _3DLEARNING.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IPromptService _promptService;

        public HomeController(IPromptService promptService)
        {
            _promptService = promptService;
        }

        [HttpGet(Name = "TriggerOpenAI")]
        public async Task<IActionResult> TriggerOpenAI([FromQuery] string input)
        {
            var response = await _promptService.TriggerOpenAI(input);
            return Ok(response);
        }
    }
}
