using BankAPI.Entities;
using BankAPI.Entities.Tables;
using BankAPI.Utility;

namespace BankAPI.Repository
{
    public interface IUserRepository : IBankRepository<User> { }

    [Service(typeof(IUserRepository))]
    public class UserRepository : GenericBankRepository<User, BankDbContext>, IUserRepository
    {
        public UserRepository(BankDbContext context) : base(context) { }
    }
}
