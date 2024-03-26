using BankAPI.Entities.Tables;
using BankAPI.Models;
using BankAPI.Repository;
using BankAPI.Utility;

namespace BankAPI.BuisinessLogic
{
    public interface IAuth0BusinessLogic
    {
        Task SyncUserFromAuth0(Auth0UserModel userData);
    }

    [Service(typeof(IAuth0BusinessLogic))]
    public class Auth0BusinessLogic: IAuth0BusinessLogic
    {
        private IUserRepository _userRepository;

        public Auth0BusinessLogic(IUserRepository userRepo)
        {
            _userRepository = userRepo;
        }

        public async Task SyncUserFromAuth0(Auth0UserModel userData)
        {
            var existingUser = (await _userRepository.GetAll())
                .FirstOrDefault(u => u.Auth0Id == userData.UserId);
            if (existingUser == null)
            {
                // map new user
            }
            else
            {
                // update old user
            }
        }
    }
}
