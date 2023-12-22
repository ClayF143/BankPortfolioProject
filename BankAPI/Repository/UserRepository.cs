using BankAPI.Entities;
using BankAPI.Entities.Tables;
using BankAPI.Utility;

namespace BankAPI.Repository
{
    public interface IUserRepository : IBankRepository<UserEntity> { }

    [Service(typeof(IUserRepository))]
    public class UserRepository : GenericBankRepository<UserEntity, BankDbContext>, IUserRepository
    {
        public UserRepository(BankDbContext context) : base(context) { }
    }
}
