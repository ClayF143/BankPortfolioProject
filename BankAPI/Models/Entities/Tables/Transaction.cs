namespace BankAPI.Models.Entities.Tables
{
    public class Transaction
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public decimal Amount { get; set; }
        public decimal? BalanceSnapshot { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string? CounterpartyName { get; set; }
        public int? CounterpartyAccountNumber { get; set; }
    }
}
