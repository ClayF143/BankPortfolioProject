namespace BankAPI.Models.Entities.Tables
{
    public class User
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }

        public List<Account> Accounts { get; set; } = new List<Account>();
    }
}
