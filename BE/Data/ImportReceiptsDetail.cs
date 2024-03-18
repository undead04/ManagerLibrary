namespace ManagerLibrary.Data
{
    public class ImportReceiptsDetail
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int ImportReceiptId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public virtual ImportReceipts? ImportReceipts { get; set; }
        public virtual Book? Book { get; set; }
    }
}
