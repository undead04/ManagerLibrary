using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models.DTO;

namespace ManagerLibrary.Services.StatisticalService
{
    public interface IStatisticalServer
    {
        Task<List<DTOTopBook>> TopBook(DateTime from,DateTime to);
        Task<List<DTOTopBook>> BorrowBook(int UserId);
        Task<BookStatisticsDTO> BookStatistis(int bookId);
        Task<StatisticalModel> Statistical();

    }
}
