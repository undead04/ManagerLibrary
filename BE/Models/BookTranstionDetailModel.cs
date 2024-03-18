namespace ManagerLibrary.Model
{
    public class BookTranstionDetailModel
    {
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public DateTime DeadLineDate { get; set; }
        public DateTime ReturnDate { get; set; }

    }
}
