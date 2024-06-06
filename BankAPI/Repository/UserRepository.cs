using BankAPI.Models.Entities;
using BankAPI.Models.Entities.Tables;
using BankAPI.Utility;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.Repository
{
    public interface IUserRepository : IBankRepository<User> { }

    [Service(typeof(IUserRepository))]
    public class UserRepository : GenericBankRepository<User, BankDbContext>, IUserRepository
    {
        public UserRepository(BankDbContext context) : base(context) { }

        public override async Task<User?> Get(int id)
        {
            return await Table.AsQueryable().Include(user => user.Accounts).ThenInclude(account => account.Transactions)
                .Where(x => x.Id == id).FirstOrDefaultAsync();
        }
    }
}
