namespace ManagerLibrary.Models.DTO
{
    public class DTOTopBook
    {
        public int Id { get; set; }
        public string UrlImage { get; set; } = string.Empty;
        public string Title { get; set;} = string.Empty;
        public int BorrowCount { get; set; }
    }
}
