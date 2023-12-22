namespace BankAPI.Entities.Tables
{
    public class AccountEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserEntity? User { get; set; }
        public double Balance { get; set; }
    }
}
