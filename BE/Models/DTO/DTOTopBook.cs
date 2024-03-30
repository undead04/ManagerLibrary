namespace ManagerLibrary.Models.DTO
{
    public class DTOTopBook
    {
        public int Id { get; set; }
        public string UrlImage { get; set; } = string.Empty;
        public string Title { get; set;} = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public int PublishedYear { get; set; }
        public int BorrowCount { get; set; }
    }
}
