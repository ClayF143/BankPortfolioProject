using BankAPI.Entities.Tables;
using BankAPI.Repository;
using BankAPI.Utility;

namespace BankAPI.BuisinessLogic
{
    public interface ITransactionBL: IBankBusinessLogic<Transaction>
    {
        Task<List<Transaction>> GetAccountTransactions(int accountId);
    }

    [Service(typeof(ITransactionBL))]
    public class TransactionBL: GenericBankBusinessLogic<Transaction>, ITransactionBL
    {
        public TransactionBL(ITransactionRepository transactionRepo): base(transactionRepo) { }

        public async Task<List<Transaction>> GetAccountTransactions(int id)
        {
            var all = await Repository.GetAll();
            return all.Where(t => t.Id == id).ToList();
        }
    }
}
