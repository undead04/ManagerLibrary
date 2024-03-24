using ManagerLibrary.Data;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Services.UpLoadService;
using Microsoft.EntityFrameworkCore;

namespace ManagerLibrary.Services.StatisticalService
{
    public class StatisticalServer : IStatisticalServer
    {
        private readonly MyDb context;
        private readonly IUploadService uploadService;

        public StatisticalServer(MyDb context,IUploadService uploadService) 
        {
            this.context = context;
            this.uploadService=uploadService;
        }
        public async Task<List<DTOTopBook>> BorrowBook(int UserId)
        {
            var detail = await context.bookTransactionsDetail
                 .Include(f => f.BookTransactions)
                 .Where(bo => bo.BookTransactions!.MembersId == UserId)
                 .Where(bo=>bo.BookTransactions!.BallotType=="X")
                 .Where(bo=>bo.ReturnDate.Date==DateTime.MinValue.Date)
                 .ToListAsync();
            return detail.Select(bo => new DTOTopBook
            {
                Id = bo.Book!.Id,
                Title = bo.Book!.Title,
                UrlImage = uploadService.GetUrlImage("Book",bo.Book!.Image),
                

            }).ToList();
        }

        public async Task<List<DTOTopBook>> TopBook(DateTime from, DateTime to)
        {
            var book = await context.bookTransactionsDetail
                .Include(f => f.BookTransactions)
                .Include(f => f.Book)
                .Where(bo => bo.BookTransactions!.BallotType == "X")
                .Where(bo => bo.BorrowDate >= from && bo.BorrowDate <= to)
                .GroupBy(group=>group.Book)
                .OrderByDescending(group=>group.Sum(bo=>bo.Quantity))
                .Select(bo => new 
                {
                   Book=bo.Key,
                   TotalQuantitySold= bo.Sum(od => od.Quantity)
                })
                .ToArrayAsync();
            return book.Select(bo => new DTOTopBook
            {
                Id=bo.Book!.Id,
                Title=bo.Book!.Title,
                UrlImage=uploadService.GetUrlImage("Book",bo.Book!.Image),
                BorrowCount=bo.TotalQuantitySold,
                
            }).ToList();

        }
    }
}
