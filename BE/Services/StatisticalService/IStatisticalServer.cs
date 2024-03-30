using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models.DTO;

namespace ManagerLibrary.Services.StatisticalService
{
    public interface IStatisticalServer
    {
        Task<List<DTOTopBook>> TopBook(DateTime? from,DateTime? to,string?search);
        Task<List<DTOTopBook>> BorrowBook(int UserId);
        Task<BookStatisticsDTO> BookStatistis(int bookId);
        Task<StatisticalModel> Statistical();
        Task<List<TopCategoryDTO>> TopCategory(DateTime? from, DateTime? to, string? search);
        Task<List<TopMembeDemurragerDTO>> TopLateMember(DateTime? from, DateTime? to,string ?search);
        Task<TopMembeDemurragerDetailDTO> DetailLate(int memberId);

    }
}
