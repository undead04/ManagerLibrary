namespace ManagerLibrary.Data
{
    public class BookTransactionDetail
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int BookTransactionId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime BorrowDate { get; set; }
        public DateTime DeadLineDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public virtual BookTransactions? BookTransactions { get; set; }
        public virtual Book? Book { get; set; }
    }
}
