using BankAPI.Entities.Tables;
using BankAPI.Repository;
using BankAPI.Utility;

namespace BankAPI.BuisinessLogic
{
    public interface IUserBL
    {
        Task Add(User user);
    }

    [Service(typeof(IUserBL))]
    public class UserBL: IUserBL
    {
        private IUserRepository _userRepository;
        private IAccountRepository _accountRepository;

        public UserBL(IUserRepository userRepo, IAccountRepository accountRepo)
        {
            _userRepository = userRepo;
            _accountRepository = accountRepo;
        }

        public async Task Add(User user)
        {
            user = await _userRepository.Add(user);
            var account = new Account
            {
                UserId = user.Id
            };
            await _accountRepository.Add(account);
        }
    }
}
