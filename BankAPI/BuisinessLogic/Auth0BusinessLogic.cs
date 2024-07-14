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

        /* So one of the reasons I'm updating is that the amount of information sent
         * changes based on whether you login with google or apple or a created auth0 account
         * which is annoying, if you keep switching between the two this will delete and add the 
         * information that's missing or added each time. Not ideal, not efficient, but my user
         * table gets the information it needs this way.
         */
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
