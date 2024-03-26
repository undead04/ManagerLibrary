namespace ManagerLibrary.Models
{
    public class ReturnBookModel
    {
        public int BookTranstionId { get; set; }
        public int[] bookDetail { get; set; }= new int[0];
    }
}
