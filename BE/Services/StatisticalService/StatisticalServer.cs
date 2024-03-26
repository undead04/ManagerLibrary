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
                 .Include(f=>f.Book)
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
                .Where(bo=>bo.Book!.Status==true)
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
        public async Task<BookStatisticsDTO> BookStatistis(int bookId)
        {
            var book=await context.books.FirstOrDefaultAsync(book=>book.Id==bookId);
            var member = await context.members.Include(f=>f.bookTransactions)!
                .ThenInclude(f=>f.bookTransactionDetails)
                .Where(me => me.bookTransactions!.Any(bo => bo.BallotType == "X"))
                .Where(me=>me.bookTransactions!.Any(bo=>bo.bookTransactionDetails!.Any(bo=>bo.ReturnDate==DateTime.MinValue)))
                .ToListAsync();
            return new BookStatisticsDTO
            {
                BookId = bookId,
                UrlImage = uploadService.GetUrlImage("Book", book!.Image),
                Title = book.Title,
                Members = member.Select(me=>new DTOMember
                {
                    Id=me.Id,
                    Name=me.Name,
                    Phone=me.Phone,
                    Avatar=me.Avatar,
                    UrlImage=uploadService.GetUrlImage("Avatar",me.Avatar),
                    Address=me.Address,
                    Gender=me.Gender,
                }).ToList()
            };
            
        }
        public async Task<StatisticalModel> Statistical()
        {
            var books = await context.books.Include(f=>f.bookTransactionDetails)!.ThenInclude(f=>f.BookTransactions).Include(f=>f.importReceiptsDetails).ToListAsync();
            int quantityBook = 0;
            int quantityExport=0;
            foreach (var book in books)
            {
                quantityBook += book.importReceiptsDetails!.Sum(im => im.Quantity);
                quantityExport += book.bookTransactionDetails!.Where(bo => bo.ReturnDate == DateTime.MinValue && bo.BookTransactions!.BallotType == "X").Sum(ex => ex.Quantity);
            }
            return new StatisticalModel
            {
                QuantityBook = quantityBook,
                QunatityPresentBook = quantityBook - quantityExport,
            };

        }
    }
}
