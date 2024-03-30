using BankAPI.Entities.Tables;
using BankAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    public class AccountController : GenericBankController<Account>
    {
        public AccountController(IAccountRepository repository) : base(repository) { }

        [HttpGet("{id}")]
        public override async Task<Account?> Get(int id)
        {
            var res = await Repository.Get(a => a.Id == id, nameof(Account.Transactions));
            return res.FirstOrDefault();
        }
    }
}
