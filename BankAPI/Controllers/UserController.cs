using BankAPI.BuisinessLogic;
using BankAPI.Entities.Tables;
using BankAPI.Models;
using BankAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    public class UserController : GenericBankController<User>
    {
        public IAuth0BusinessLogic auth0BusinessLogic { get; set; }

        public UserController(IUserRepository repository, IAuth0BusinessLogic auth0bl) : base(repository)
        {
            auth0BusinessLogic = auth0bl;
        }

        [HttpGet("{id}")]
        public override async Task<User?> Get(int id)
        {
            var res = await Repository.Get(a => a.Id == id, nameof(Entities.Tables.User.Accounts));
            return res.FirstOrDefault();
        }

        [HttpPut]
        public async Task SyncUserFromAuth0([FromBody] Auth0UserModel userData)
        {
            await auth0BusinessLogic.SyncUserFromAuth0(userData);
        }
    }
}
