

namespace ManagerLibrary.Model
{
    public class ImportBookMode
    {
        public string UserId { get; set; } = string.Empty;
        public List<ImportBookDetail>? importBookDetails { get; set; }
    }
}
