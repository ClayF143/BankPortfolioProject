using BankAPI.Entities.Tables;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.Entities
{
    public class BankDbContext: DbContext
    {
        public DbSet<UserEntity> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            optionsBuilder.UseSqlite($"Data Source={Path.Join(path, "bank.db")}");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SeedData.Seed(modelBuilder);
        }
    }
}
