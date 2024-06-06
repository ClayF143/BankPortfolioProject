using BankAPI.Models.Entities.Tables;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.Models.Entities
{
    public class BankDbContext : DbContext
    {
        public BankDbContext(DbContextOptions<BankDbContext> context) : base(context) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
