using BankAPI.Entities;
using BankAPI.Entities.Tables;
using BankAPI.Utility;

namespace BankAPI.Repository
{
    public interface IAccountRepository : IBankRepository<AccountEntity> { }

    [Service(typeof(IAccountRepository))]
    public class AccountRepository : GenericBankRepository<AccountEntity, BankDbContext>, IAccountRepository
    {
        public AccountRepository(BankDbContext context) : base(context) { }
    }
}
