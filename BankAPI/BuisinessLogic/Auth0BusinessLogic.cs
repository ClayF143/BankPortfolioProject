using BankAPI.Models;
using BankAPI.Models.Entities.Tables;
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
        private IUserBL _userBL;

        public Auth0BusinessLogic(IUserRepository userRepo, IUserBL userBL)
        {
            _userRepository = userRepo;
            _userBL = userBL;
        }

        public async Task SyncUserFromAuth0(Auth0UserModel userData)
        {
            List<User> users = await _userRepository.GetAll();
            var existingUser = users
                .FirstOrDefault(u => u.Email == userData.Email);

            if (existingUser == null)
            {
                // add new user
                var newUser = new User
                {
                    Email = userData.Email,
                    FirstName = userData.FirstName,
                    LastName = userData.LastName,
                    FullName = userData.Name,
                };

                await _userBL.Add(newUser);
            }
            else
            {
                // update old user
                existingUser.Email = userData.Email;
                existingUser.FirstName = userData.FirstName;
                existingUser.LastName = userData.LastName;
                existingUser.FullName = userData.Name;

                await _userRepository.Update(existingUser);
            }
        }
    }
}
