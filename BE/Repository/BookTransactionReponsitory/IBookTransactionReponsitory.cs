
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;

namespace ManagerLibrary.Repository.BookTransactionReponsitory
{
    public interface IBookTransactionReponsitory
    {
        Task CreateBookTranstion(BookTranstionModel model);
        
        Task<List<DTOBookTranstion>> GetAllBookTranstion(string? BallotType, string?staffId,int?memberId);
        Task<List<DTOBookTranstionDetail>> GetAllBookTranstionDetail(int Id);
        Task<List<DTOBookTranstion>> GetAllUnpaidBook(string?search,int?bookId);
       
        Task CreateReturnBook(ReturnBookModel model);
        bool IsBorrowBookMember(int Id);
        
       
    }
}
