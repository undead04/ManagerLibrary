using ManagerLibrary.Data;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Services.UpLoadService;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.ComponentModel;

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

        public async Task<List<DTOTopBook>> TopBook(DateTime? from, DateTime? to, string? search)
        {
            var book = context.bookTransactionsDetail
                .Include(f => f.BookTransactions)
                .Include(f => f.Book)
                .Where(bo => bo.BookTransactions!.BallotType == "X")
                .AsQueryable();
            if (from.HasValue)
            {
                book = book.Where(bo => bo.BorrowDate.Date >= from);
            }
            if (from.HasValue)
            {
                book = book.Where(bo => bo.BorrowDate.Date <= to);
            }
            if(!string.IsNullOrEmpty(search))
            {
                book = book.Where(bo => bo.Book!.Title.Contains(search) || bo.Book!.ISBN.Contains(search));
            }
            var topBook=await book.GroupBy(group => group.Book)
                .OrderByDescending(group => group.Sum(bo => bo.Quantity))
                .Select(bo => new
                {
                    Book = bo.Key,
                    TotalQuantitySold = bo.Sum(od => od.Quantity)
                })
                .ToArrayAsync();
            return topBook.Select(bo => new DTOTopBook
            {
                Id=bo.Book!.Id,
                Title=bo.Book!.Title,
                UrlImage=uploadService.GetUrlImage("Book",bo.Book!.Image),
                Author=bo.Book!.Author,
                ISBN=bo.Book!.ISBN,
                PublishedYear=bo.Book!.PublishedYear,
                BorrowCount=bo.TotalQuantitySold,
                
            }).ToList();

        }
        public async Task<BookStatisticsDTO> BookStatistis(int bookId)
        {
            var book = await context.books.FirstOrDefaultAsync(book => book.Id == bookId);
            var member = await context.members
                .Include(f=>f.bookTransactions)!
                .ThenInclude(f=>f.bookTransactionDetails)
                .Where(me => me.bookTransactions!.Any(bo => bo.BallotType == "X"))
                .Where(me => me.bookTransactions!.Any(bo => bo.bookTransactionDetails!.Any(bo => bo.BookId == bookId&&bo.ReturnDate==DateTime.MinValue))).ToListAsync();
            
            
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
                QuantityPresentBook = quantityBook - quantityExport,
                QuantityMember = context.members.Count()
            };

        }

        public async Task<List<TopCategoryDTO>> TopCategory(DateTime? from, DateTime? to,string?search)
        {
            var category =  context.bookTransactionsDetail
                 .Include(f => f.BookTransactions)
                 .Include(f => f.Book)
                 .ThenInclude(f => f!.Category)
                 .Where(bo => bo.BookTransactions!.BallotType == "X")
                 .AsQueryable();
            if(from.HasValue)
            {
                category = category.Where(ca => ca.BorrowDate >= from);
            }
            if(to.HasValue)
            {
                category = category.Where(ca => ca.BorrowDate <= to);
            }
            if(!string.IsNullOrEmpty(search))
            {
                category = category.Where(ca => ca.Book!.Category!.Name.Contains(search));
            }
            var topCategory =await category.GroupBy(group => group.Book!.Category)
                 .OrderByDescending(group => group.Sum(bo => bo.Quantity))
                 .Select(bo => new
                 {
                     Category = bo.Key,
                     TotalQuantitySold = bo.Sum(od => od.Quantity)
                 })
                 .ToArrayAsync();
            return topCategory.Select(ca => new TopCategoryDTO
            {
                Id=ca.Category!.CategoryId,
                Name=ca.Category.Name,
                Description=ca.Category.Description,
                BorrowCount=ca.TotalQuantitySold,
            }).ToList();
        }

        public async Task<List<TopMembeDemurragerDTO>> TopLateMember(DateTime? from, DateTime? to,string?search)
        {
            var member = context.bookTransactionsDetail
                 .Include(f => f.BookTransactions)
                 .ThenInclude(f=>f!.members)
                 .Include(f => f.Book)
                 .Where(bo => bo.BookTransactions!.BallotType == "X")
                 .Where(bo=>DateTime.Now.Date>bo.DeadLineDate.Date&&bo.ReturnDate==DateTime.MinValue||bo.ReturnDate.Date>bo.DeadLineDate.Date)
                 .AsQueryable();
            if(from.HasValue)
            {
                member = member.Where(me => me.BorrowDate >= from);
            }
            if(to.HasValue)
            {
                member = member.Where(me => me.BorrowDate <= to);
            }
            if (!string.IsNullOrEmpty(search))
            {
                member = member.Where(me => me.BookTransactions!.members!.Name.Contains(search) || me.BookTransactions!.members!.Phone.Contains(search));
            }
            var topMember=await member.GroupBy(group => group.BookTransactions!.members)
                 .OrderByDescending(group => group.Sum(bo => bo.Quantity))
                 .Select(bo => new
                 {
                     Member = bo.Key,
                     TotalQuantitySold = bo.Sum(od => od.Quantity)
                 })
                 .ToArrayAsync();
            return topMember.Select(x => new TopMembeDemurragerDTO
            {
                Id=x.Member!.Id,
                Address=x.Member.Address,
                UrlImage=uploadService.GetUrlImage("Avatar",x.Member.Avatar),
                Gender=x.Member.Gender,
                Name=x.Member.Name,
                Avatar=x.Member.Avatar,
                Phone=x.Member.Phone,
                LateCount=x.TotalQuantitySold
            }).ToList();
        }

        public async Task<TopMembeDemurragerDetailDTO> DetailLate(int memberId)
        {
            var member = await context.members.FirstOrDefaultAsync(me => me.Id == memberId);
            var booktranDetail = await context.bookTransactionsDetail.Include(f => f.BookTransactions).Include(f => f.Book)
                .Where(bo => bo.BookTransactions!.BallotType == "X")
                .Where(bo=>bo.BookTransactions!.MembersId==memberId)
                .Where(bo => DateTime.Now.Date > bo.DeadLineDate.Date && bo.ReturnDate == DateTime.MinValue || bo.ReturnDate.Date > bo.DeadLineDate.Date)
                .ToListAsync();
            return new TopMembeDemurragerDetailDTO
            {
                Name = member!.Name,
                Phone=member!.Phone,
                UrlImage=uploadService.GetUrlImage("Avatar",member!.Avatar),
                bookTranstionDetail=booktranDetail.Select(bo=>new DTOBookTranstionDetail
                {
                    UrlImage=uploadService.GetUrlImage("Book",bo.Book!.Image),
                    BookId=bo.BookId,
                    NameBook=bo.Book!.Title,
                    Id=bo.Id,
                    BorrowDate=bo.BorrowDate,
                    DeadLineDate=bo.DeadLineDate,
                    ReturnDate=bo.ReturnDate,
                    Price=bo.Price,
                    Quantity=bo.Quantity,
                    Status= DateTime.Now.Date > bo.DeadLineDate.Date && bo.ReturnDate == DateTime.MinValue || bo.ReturnDate.Date > bo.DeadLineDate.Date?"Quá hạn":bo.ReturnDate.Date<=bo.DeadLineDate.Date&&bo.ReturnDate!=DateTime.MinValue
                    ?"Trả đúng hạn":string.Empty,

                }).ToList(),
            };
        }
    }
}
