namespace ManagerLibrary.Data
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public int PublishedYear { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
        
        public int CategoryId { get; set; }
        public bool Status { get; set; } = true;
        public virtual Category? Category { get; set; }
        public ICollection<ImportReceiptsDetail>? importReceiptsDetails { get; set; }
        public ICollection<BookTransactionDetail>? bookTransactionDetails { get; set; }
    }
}
