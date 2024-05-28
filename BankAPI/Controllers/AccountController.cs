using BankAPI.BuisinessLogic;
using BankAPI.Entities.Tables;
using Microsoft.AspNetCore.Authorization;

namespace BankAPI.Controllers
{
    [Authorize]
    public class AccountController : GenericBankController<Account>
    {
        public AccountController(IAccountBL bl) : base(bl) { }
    }
}
