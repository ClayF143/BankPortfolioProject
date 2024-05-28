using BankAPI.Entities.Tables;
using BankAPI.Repository;
using BankAPI.Utility;

namespace BankAPI.BuisinessLogic
{
    public interface IUserBL: IBankBusinessLogic<User> { }

    [Service(typeof(IUserBL))]
    public class UserBL: GenericBankBusinessLogic<User>, IUserBL
    {
        private IAccountBL AccountBL;

        public UserBL(IUserRepository userRepo, IAccountBL accountBL): base(userRepo)
        {
            AccountBL = accountBL;
        }

        public override async Task Add(User user)
        {
            user = await Repository.Add(user);
            var account = new Account
            {
                UserId = user.Id
            };
            await AccountBL.Add(account);
        }
    }
}
