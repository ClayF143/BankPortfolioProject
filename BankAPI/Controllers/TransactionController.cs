using BankAPI.BuisinessLogic;
using BankAPI.Models.Entities.Tables;
using Microsoft.AspNetCore.Authorization;

namespace BankAPI.Controllers
{
    [Authorize]
    public class TransactionController : GenericBankController<Transaction, ITransactionBL>
    {
        public TransactionController(ITransactionBL bl) : base(bl) { }
    }
}
