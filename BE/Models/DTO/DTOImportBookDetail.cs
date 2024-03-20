namespace ManagerLibrary.Models.DTO
{
    public class DTOImportBookDetail
    {
        public int Id { get; set; }
        public string NameBook { get; set; } = string.Empty;
        public int ImportReceiptId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int BookId { get; set; }
    }
}
