namespace ManagerLibrary.Model
{
    public class BookTranstionModel
    {
        public string StaffId { get; set; } = string.Empty;
        public int MemebrId { get; set; }
        public string BallotType { get; set; } = string.Empty;
        public List<BookTranstionDetailModel>? TranstionBookDetail { get; set; }

    }
    
}
