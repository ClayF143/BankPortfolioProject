using BankAPI.Utility;
using BankAPI.Models.Entities;
using BankAPI.Models.Entities.Tables;

namespace BankAPI.Repository
{
    public interface ITransactionRepository : IBankRepository<Transaction> { }

    [Service(typeof(ITransactionRepository))]
    public class TransactionRepository: GenericBankRepository<Transaction, BankDbContext>, ITransactionRepository
    {
        public TransactionRepository(BankDbContext context) : base(context) { }
    }
}
