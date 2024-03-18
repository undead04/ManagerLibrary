using ManagerLibrary.Model;
namespace ManagerLibrary.Model.DTO
{
    public class DTOBook
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public int PublishedYear { get; set; }
        public decimal Price { get; set; }
        public string? Image { get; set; }
        public int CategoryId { get; set; }
        public string UrlImage { get; set; } = string.Empty;
    }
}
