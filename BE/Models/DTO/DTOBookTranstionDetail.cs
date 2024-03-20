namespace ManagerLibrary.Model.DTO
{
    public class DTOBookTranstionDetail
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public string NameBook { get; set; } = string.Empty;
        public DateTime DeadLineDate { get; set; }
        public DateTime BorrowDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime ReturnDate { get; set; }
    }
}
