using BankAPI.Models;
using BankAPI.Models.Entities.Tables;
using BankAPI.Repository;
using BankAPI.Utility;

namespace BankAPI.BuisinessLogic
{
    public interface IUserBL: IBankBusinessLogic<User>
    {
        Task<User?> GetUserByEmail(string email);
    }

    [Service(typeof(IUserBL))]
    public class UserBL: GenericBankBusinessLogic<User, IUserRepository>, IUserBL
    {
        protected IAccountBL AccountBL { get; set; }

        public UserBL(IUserRepository userRepo, IAccountBL accountBL): base(userRepo)
        {
            AccountBL = accountBL;
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await Repository.GetUserByEmail(email);
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
