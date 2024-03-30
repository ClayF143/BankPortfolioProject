using BankAPI.Entities;
using BankAPI.Entities.Tables;
using BankAPI.Utility;

namespace BankAPI.Repository
{
    public interface IAccountRepository : IBankRepository<Account> { }

    [Service(typeof(IAccountRepository))]
    public class AccountRepository : GenericBankRepository<Account, BankDbContext>, IAccountRepository
    {
        public AccountRepository(BankDbContext context) : base(context) { }
    }
}
