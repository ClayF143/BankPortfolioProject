namespace BankAPI.Services.Auth0
{
    public class Auth0UserService
    {
        private readonly HttpClient _httpClient;
        private readonly Auth0TokenService _tokenService;
        private readonly IConfiguration _configuration;

        public Auth0UserService(HttpClient httpClient, Auth0TokenService tokenService, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _tokenService = tokenService;
            _configuration = configuration;
        }

        public async Task<string> GetUsersAsync()
        {
            string token = await _tokenService.GetTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.GetAsync("https://" + _configuration["Auth0:Domain"] + "/api/v2/users");

            return await response.Content.ReadAsStringAsync();
        }
    }
}
