using BankAPI.Models.Entities;
using BankAPI.Models.Entities.Tables;
using BankAPI.Utility;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.Repository
{
    public interface IAccountRepository : IBankRepository<Account> { }

    [Service(typeof(IAccountRepository))]
    public class AccountRepository : GenericBankRepository<Account, BankDbContext>, IAccountRepository
    {
        public AccountRepository(BankDbContext context) : base(context) { }

        public override Task<Account?> Get(int id) => 
            Table.AsQueryable().Include(account => account.Transactions).Where(account => account.Id == id).FirstOrDefaultAsync();
    }
}
