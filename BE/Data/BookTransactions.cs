namespace ManagerLibrary.Data
{
    public class BookTransactions
    {
        public int Id { get; set; }
        public DateTime Create_At { get; set; }
        public string BallotType { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public int MembersId { get; set; }
        public virtual ApplicationUser? User { get; set; }
        public ICollection<BookTransactionDetail>? bookTransactionDetails { get; set; }
        public virtual Members? members { get; set; }
    }
}
