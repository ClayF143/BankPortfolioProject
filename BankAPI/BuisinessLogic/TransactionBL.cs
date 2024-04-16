using BankAPI.Entities.Tables;
using BankAPI.Repository;
using BankAPI.Utility;

namespace BankAPI.BuisinessLogic
{
    public interface ITransactionBL
    {
        Task<List<Transaction>> GetAccountTransactions(int accountId);
    }

    [Service(typeof(ITransactionBL))]
    public class TransactionBL: ITransactionBL
    {
        private ITransactionRepository _transactionRepository;

        public TransactionBL(ITransactionRepository transactionRepo)
        {
            _transactionRepository = transactionRepo;
        }

        public async Task<List<Transaction>> GetAccountTransactions(int AccountNumber)
        {
            var all = await _transactionRepository.GetAll();
            return all.Where(t => t.AccountNumber == AccountNumber).ToList();
        }
    }
}
