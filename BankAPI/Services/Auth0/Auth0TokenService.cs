using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace BankAPI.Services.Auth0
{
    public class Auth0TokenService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public Auth0TokenService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> GetTokenAsync()
        {
            var response = await _httpClient.PostAsync("https://" + _configuration["Auth0:Domain"] + "/oauth/token", new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("client_id", _configuration["Auth0:ClientId"] ?? ""),
                new KeyValuePair<string, string>("client_secret", _configuration["Auth0:ClientSecret"] ?? ""),
                new KeyValuePair<string, string>("audience", _configuration["Auth0:Audience"] ?? ""),
                new KeyValuePair<string, string>("grant_type", "client_credentials")
            }));

            var responseString = await response.Content.ReadAsStringAsync();
            dynamic? tokenResponse = JsonConvert.DeserializeObject(responseString);
            return tokenResponse?.access_token ?? "";
        }
    }
}
