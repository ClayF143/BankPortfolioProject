namespace BankAPI.Entities.Tables
{
    public class Transaction
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public double Amount { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string? CounterpartyName { get; set; }
        public int? CounterpartyAccountNumber { get; set; }
    }
}
