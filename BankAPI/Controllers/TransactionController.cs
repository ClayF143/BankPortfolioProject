using BankAPI.Entities.Tables;
using BankAPI.Repository;
using Microsoft.AspNetCore.Authorization;

namespace BankAPI.Controllers
{
    [Authorize]
    public class TransactionController : GenericBankController<Transaction>
    {
        public TransactionController(ITransactionRepository repository) : base(repository) { }
    }
}
