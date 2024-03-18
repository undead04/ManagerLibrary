namespace ManagerLibrary.Data
{
    public class ImportReceipts
    {
        public int Id { get; set; }
        public DateTime Create_At { get; set; }
        public string UserId { get; set; } = string.Empty;
        public virtual ApplicationUser? User { get; set; }
        public ICollection<ImportReceiptsDetail>? importReceiptsDetails { get; set; }
    }
}
