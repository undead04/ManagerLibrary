using ManagerLibrary.Model.DTO;
using ManagerLibrary.Model;

namespace ManagerLibrary.Repository.BookReponsitory
{
    public interface IBookReponsitory
    {
        Task createBook(BookModel model);
        Task deleteBook(int id);
        Task updateBook(int id, BookModel model);
        Task<DTOBook> getBook(int id);
        Task<List<DTOBook>> getAllBook();
    }
}
