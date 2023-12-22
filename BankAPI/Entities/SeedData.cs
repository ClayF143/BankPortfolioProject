using BankAPI.Entities.Tables;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.Entities
{
    public static class SeedData
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>().HasData(new List<UserEntity>
            {
                new UserEntity
                {
                    Id = 1,
                    FirstName = "Adam",
                    LastName = "Anderson",
                    Email = "adam.anderson@gmail.com"
                },
                new UserEntity
                {
                    Id = 2,
                    FirstName = "Billy",
                    LastName = "Baker",
                    Email = "billy.baker@gmail.com"
                },
                new UserEntity
                {
                    Id = 3,
                    FirstName = "Carol",
                    LastName = "Carson",
                    Email = "carol.carson@gmail.com"
                }
            });

            modelBuilder.Entity<AccountEntity>().HasData(new List<AccountEntity>
            {
                new AccountEntity
                {
                    Id = 1,
                    UserId = 2,
                    Balance = 1250.00
                },
                new AccountEntity
                {
                    Id = 2,
                    UserId = 2,
                    Balance = 50.00
                },
                new AccountEntity
                {
                    Id = 3,
                    UserId = 3,
                    Balance = 3.26
                },
                new AccountEntity
                {
                    Id = 4,
                    UserId = 1,
                    Balance = 150.00
                },
                new AccountEntity
                {
                    Id = 5,
                    UserId = 2,
                    Balance = 25123.00
                }
            });
        }
    }
}
