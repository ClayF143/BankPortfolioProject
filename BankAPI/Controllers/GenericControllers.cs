using BankAPI.Entities.Tables;
using BankAPI.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : GenericBankController<UserEntity>
    {
        public UserController(IUserRepository repository) : base(repository) { }
    }

    [Route("[controller]")]
    [ApiController]
    public class AccountController : GenericBankController<AccountEntity>
    {
        public AccountController(IAccountRepository repository) : base(repository) { }
    }
}
