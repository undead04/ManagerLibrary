namespace ManagerLibrary.Data
{
    public class Members
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public bool Gender { get; set; }
        public ICollection<BookTransactions>? bookTransactions { get; set; }
    }
}
