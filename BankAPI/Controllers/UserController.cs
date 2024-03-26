using BankAPI.BuisinessLogic;
using BankAPI.Entities.Tables;
using BankAPI.Models;
using BankAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UserController : GenericBankController<UserEntity>
    {
        public IAuth0BusinessLogic auth0BusinessLogic { get; set; }

        public UserController(IUserRepository repository, IAuth0BusinessLogic auth0bl) : base(repository)
        {
            auth0BusinessLogic = auth0bl;
        }

        [HttpPut]
        [Authorize]
        public void SyncUserFromAuth0([FromBody] Auth0UserModel userData)
        {
            auth0BusinessLogic.SyncUserFromAuth0(userData);
        }
    }
}
