using BankAPI.Entities.Tables;
using BankAPI.Repository;

namespace BankAPI.Controllers
{
    public class TransactionController : GenericBankController<Transaction>
    {
        public TransactionController(ITransactionRepository repository) : base(repository) { }
    }
}
