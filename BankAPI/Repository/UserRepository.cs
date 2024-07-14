using BankAPI.Models.Entities;
using BankAPI.Models.Entities.Tables;
using BankAPI.Utility;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.Repository
{
    public interface IUserRepository : IBankRepository<User>
    {
        Task<User?> GetUserByEmail(string email);
    }

    [Service(typeof(IUserRepository))]
    public class UserRepository : GenericBankRepository<User, BankDbContext>, IUserRepository
    {
        public UserRepository(BankDbContext context) : base(context) { }

        public override async Task<User?> Get(int id)
        {
            return await Table.AsQueryable().Include(user => user.Accounts).ThenInclude(account => account.Transactions)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await Table.AsQueryable().Include(user => user.Accounts).ThenInclude(account => account.Transactions)
                .FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}
