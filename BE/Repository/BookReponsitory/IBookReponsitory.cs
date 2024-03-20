using ManagerLibrary.Model.DTO;
using ManagerLibrary.Model;

namespace ManagerLibrary.Repository.BookReponsitory
{
    public interface IBookReponsitory
    {
        Task<int> createBook(BookModel model);
        Task deleteBook(int id);
        Task updateBook(int id, BookModel model);
        Task<DTOBook> getBook(int id);
        Task<List<DTOBook>> getAllBook(string?search,int? categoryId);
        Task StopPublishing(int id);
    }
}
