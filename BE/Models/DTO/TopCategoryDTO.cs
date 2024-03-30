namespace ManagerLibrary.Models.DTO
{
    public class TopCategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; }=string.Empty;
        public int BorrowCount { get; set; }
    }
}
