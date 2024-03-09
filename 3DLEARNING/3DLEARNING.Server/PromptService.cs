using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using OpenAI_API;
using OpenAI_API.Models;

namespace _3DLEARNING.Server
{
    public interface IPromptService
    {
        Task<string> TriggerOpenAI(string prompt);
    }
    public class PromptService : IPromptService
    {
        public readonly IConfiguration _configuration;
        public PromptService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> TriggerOpenAI(string prompt)
        {
            var apiKey = _configuration.GetValue<string>("OpenAISetting:APIKey");
            var baseUrl = _configuration.GetValue<string>("OpenAISetting:BaseUrl");

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var request = new OpenAIRequestDto
            {
                Model = "gpt-3.5-turbo",
                Messages = new List<OpenAIMessageRequestDto>{
                    new OpenAIMessageRequestDto
                    {
                        Role = "user",
                        Content = prompt
                    }
                },
                MaxTokens = 100
            };
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(baseUrl, content);
            var resjson = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode)
            {
                var errorResponse = JsonSerializer.Deserialize<OpenAIErrorResponseDto>(resjson);
                throw new System.Exception(errorResponse.Error.Message);
            }
            var data = JsonSerializer.Deserialize<OpenAIResponseDto>(resjson);
            var responseText = data.choices[0].message.content;

            return responseText;
        }
    }

    public class OpenAIRequestDto
    {
        [JsonPropertyName("model")]
        public string Model { get; set; }

        [JsonPropertyName("messages")]
        public List<OpenAIMessageRequestDto> Messages { get; set; }

        [JsonPropertyName("temperature")]
        public float Temperature { get; set; }

        [JsonPropertyName("max_tokens")]
        public int MaxTokens { get; set; }
    }

    public class OpenAIMessageRequestDto
    {
        [JsonPropertyName("role")]
        public string Role { get; set; }

        [JsonPropertyName("content")]
        public string Content { get; set; }
    }

    public class OpenAIErrorResponseDto
    {
        [JsonPropertyName("error")]
        public OpenAIError Error { get; set; }
    }
    public class OpenAIError
    {
        [JsonPropertyName("message")]
        public string Message { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("param")]
        public string Param { get; set; }

        [JsonPropertyName("code")]
        public string Code { get; set; }
    }

    public class OpenAIResponseDto
    {
        public string id { get; set; }
        public string @object { get; set; }
        public int created { get; set; }
        public string model { get; set; }
        public List<Choice> choices { get; set; }
        public Usage usage { get; set; }
    }

    public class Choice
    {
        public int index { get; set; }
        public Message message { get; set; }
        public object logprobs { get; set; }
        public string finish_reason { get; set; }
    }
    public class Usage
    {
        public int prompt_tokens { get; set; }
        public int completion_tokens { get; set; }
        public int total_tokens { get; set; }
    }
    public class OpenAIChoice
    {
        public string text { get; set; }
        public float probability { get; set; }
        public float[] logprobs { get; set; }
        public int[] finish_reason { get; set; }
    }

    public class Message
    {
        public string role { get; set; }
        public string content { get; set; }
    }
}
