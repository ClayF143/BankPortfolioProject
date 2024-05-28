using System.ComponentModel.DataAnnotations;

namespace BankAPI.Entities.Tables
{
    public class Account
    {
        public int Id { get; set; }
        public int AccountNumber { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = "Primary";
        public string Type { get; set; } = "Checking";
        public decimal Balance { get; set; } = 0;

        public List<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
