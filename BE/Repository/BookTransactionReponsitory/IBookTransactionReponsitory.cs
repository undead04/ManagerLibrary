
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;

namespace ManagerLibrary.Repository.BookTransactionReponsitory
{
    public interface IBookTransactionReponsitory
    {
        Task CreateBookTranstion(BookTranstionModel model);
        
        Task<List<DTOBookTranstion>> GetAllBookTranstion();
        Task<List<DTOBookTranstionDetail>> GetAllBookTranstionDetail(int Id);
        Task<List<DTOBookTranstion>> GetAllUnpaidBook();
        Task<List<DTOBookTranstionDetail>> UnpaidBookDetail(int Id);
        Task CreateReturnBook(int[] Id);
        bool IsBorrowBookMember(int Id);
        
       
    }
}
