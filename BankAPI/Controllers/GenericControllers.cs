using BankAPI.Entities.Tables;
using BankAPI.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : GenericBankController<UserEntity>
    {
        public UserController(IBankRepository<UserEntity> repository) : base(repository) { }
    }

    [Route("[controller]")]
    [ApiController]
    public class AccountController : GenericBankController<AccountEntity>
    {
        public AccountController(IBankRepository<AccountEntity> repository) : base(repository) { }
    }
}
