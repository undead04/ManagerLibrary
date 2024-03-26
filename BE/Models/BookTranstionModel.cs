namespace ManagerLibrary.Model
{
    public class BookTranstionModel
    {
      
        public int MemberId { get; set; }
        
        public List<BookTranstionDetailModel>? TransitionBookDetail { get; set; }

    }
    
}
