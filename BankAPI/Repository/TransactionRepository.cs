using BankAPI.Entities.Tables;
using BankAPI.Entities;
using BankAPI.Utility;

namespace BankAPI.Repository
{
    public interface ITransactionRepository : IBankRepository<Transaction> { }

    [Service(typeof(ITransactionRepository))]
    public class TransactionRepository: GenericBankRepository<Transaction, BankDbContext>, ITransactionRepository
    {
        public TransactionRepository(BankDbContext context) : base(context) { }
    }
}
