namespace BankAPI.Entities.Tables
{
    public class Account
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Balance { get; set; }

        public List<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
