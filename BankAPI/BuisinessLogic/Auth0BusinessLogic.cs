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
            List<User> users = await _userRepository.GetAll();
            var existingUser = users
                .FirstOrDefault(u => u.Auth0Id == userData.UserId);

            if (existingUser == null)
            {
                // add new user
                var newUser = new User
                {
                    Auth0Id = userData.UserId,
                    Email = userData.Email,
                    FirstName = userData.FirstName,
                    LastName = userData.LastName,
                    FullName = userData.Name,
                };

                await _userRepository.Add(newUser);
            }
            else
            {
                // update old user
                existingUser.Auth0Id = userData.UserId;
                existingUser.Email = userData.Email;
                existingUser.FirstName = userData.FirstName;
                existingUser.LastName = userData.LastName;
                existingUser.FullName = userData.Name;

                await _userRepository.Update(existingUser);
            }
        }
    }
}
