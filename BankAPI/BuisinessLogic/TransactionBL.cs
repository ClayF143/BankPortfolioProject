using BankAPI.Models.Entities.Tables;
using BankAPI.Repository;
using BankAPI.Utility;

namespace BankAPI.BuisinessLogic
{
    public interface ITransactionBL: IBankBusinessLogic<Transaction> { }

    [Service(typeof(ITransactionBL))]
    public class TransactionBL: GenericBankBusinessLogic<Transaction, ITransactionRepository>, ITransactionBL
    {
        public IAccountBL AccountBL;
        public TransactionBL(ITransactionRepository transactionRepo, IAccountBL accountBL): base(transactionRepo)
        {
            AccountBL = accountBL;
        }

        public override async Task Add(Transaction value)
        {
            var account = await AccountBL.Get(value.AccountId);
            account.Balance += value.Amount;
            await AccountBL.Update(account);

            value.BalanceSnapshot = account.Balance;

            await base.Add(value);
        }
    }
}
