namespace BankAPI.Entities.Tables
{
    public class UserEntity
    {
        public int Id { get; set; }
        public int Auth0Id { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
