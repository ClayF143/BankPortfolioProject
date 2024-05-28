using BankAPI.Entities.Tables;
using BankAPI.Repository;
using BankAPI.Utility;

namespace BankAPI.BuisinessLogic
{
    public interface IAccountBL: IBankBusinessLogic<Account> { }

    [Service(typeof(IAccountBL))]
    public class AccountBL: GenericBankBusinessLogic<Account>, IAccountBL
    {
        public AccountBL(IAccountRepository repo): base(repo) { }
    }
}
