using BankAPI.BuisinessLogic;
using BankAPI.Entities.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Authorize]
    public class TransactionController : GenericBankController<Transaction>
    {
        private ITransactionBL TransactionBL { get; set; }
        public TransactionController(ITransactionBL bl) : base(bl)
        {
            TransactionBL = bl;
        }

        [HttpGet("{accountId}")]
        public async Task<List<Transaction>> GetAccountTransactions(int accountId)
        {
            var x = await TransactionBL.GetAccountTransactions(accountId);
            return x;
        }
    }
}
