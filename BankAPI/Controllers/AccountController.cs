using BankAPI.BuisinessLogic;
using BankAPI.Models.Entities.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Authorize]
    public class AccountController : GenericBankController<Account>
    {
        public AccountController(IAccountBL bl) : base(bl) { }
    }
}
