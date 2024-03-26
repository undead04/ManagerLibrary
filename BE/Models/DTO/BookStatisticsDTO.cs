using ManagerLibrary.Model.DTO;

namespace ManagerLibrary.Models.DTO
{
    public class BookStatisticsDTO
    {
        public int BookId { get; set; }
        public string UrlImage { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public List<DTOMember> Members { get; set; }=new List<DTOMember>();



    }
}
