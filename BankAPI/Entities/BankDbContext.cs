using BankAPI.Entities.Tables;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.Entities
{
    public class BankDbContext: DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<AccountEntity> Accounts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=bankdb;Trusted_Connection=True;");
        }
    }
}
