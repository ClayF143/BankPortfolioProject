using BankAPI.BuisinessLogic;
using BankAPI.Models;
using BankAPI.Models.Entities.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Authorize]
    [AllowAnonymous]
    public class UserController : GenericBankController<User, IUserBL>
    {
        public IAuth0BusinessLogic auth0BusinessLogic { get; set; }

        public UserController(IUserBL bl, IAuth0BusinessLogic auth0bl) : base(bl)
        {
            auth0BusinessLogic = auth0bl;
        }

        [HttpGet]
        public async Task<User?> GetCurrentUser() =>
            await GetCurrentUserHelper();

        [HttpPut]
        [AllowAnonymous]
        public async Task SyncUserFromAuth0([FromBody] Auth0UserModel userData)
        {
            await auth0BusinessLogic.SyncUserFromAuth0(userData);
        }

        private async Task<User?> GetCurrentUserHelper()
        {
            var emailClaim = User.Claims.FirstOrDefault(c => c.Type == "bankapi/email");
            if (emailClaim == null)
                return null;
            var email = emailClaim.Value ?? "";
            var users = await BL.GetAll();
            return users.FirstOrDefault(u => u.Email == email);
        }
    }
}
