using BankAPI.BuisinessLogic;
using BankAPI.Entities.Tables;
using BankAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Authorize]
    public class TransactionController : GenericBankController<Transaction>
    {
        private ITransactionBL _transactionBL;

        public TransactionController(ITransactionRepository repository, ITransactionBL bl) : base(repository)
        {
            _transactionBL = bl;
        }

        [HttpGet("{accountId}")]
        public async Task<List<Transaction>> GetAccountTransactions(int accountId)
        {
            return await _transactionBL.GetAccountTransactions(accountId);
        }
    }
}
