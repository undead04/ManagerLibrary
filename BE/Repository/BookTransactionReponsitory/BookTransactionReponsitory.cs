
using ManagerLibrary.Data;
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;

namespace ManagerLibrary.Repository.BookTransactionReponsitory
{
    public class BookTransactionReponsitory : IBookTransactionReponsitory
    {
        private readonly MyDb context;

        public BookTransactionReponsitory(MyDb context) 
        {
            this.context = context;
        }
        public async Task CreateBookTranstion(BookTranstionModel model)
        {
            var bookTranstion = new BookTransactions
            {
                Create_At = DateTime.Now,
                MembersId=model.MemebrId,
                UserId=model.StaffId,
                BallotType=model.BallotType
            };
            await context.bookTransactions.AddAsync(bookTranstion);
            await context.SaveChangesAsync();
            foreach(var borrowBook in model.TranstionBookDetail)
            {
                var book = await context.books.FirstOrDefaultAsync(bo => bo.Id == borrowBook.BookId);
                  var booktranstionDetail = new BookTransactionDetail
                {
                    BookTransactionId= bookTranstion.Id,
                    BookId = borrowBook.BookId,
                    Quantity= borrowBook.Quantity,
                    BorrowDate=DateTime.Now.Date,
                    DeadLineDate= borrowBook.DeadLineDate.Date,
                    Price=book.Price+50,
                };
                await context.bookTransactionsDetail.AddAsync(booktranstionDetail);
                await context.SaveChangesAsync();
            }
        }

        public async Task<List<DTOBookTranstion>> GetAllBookTranstion()
        {
            return await context.bookTransactions.Include(f=>f.bookTransactionDetails).Include(f=>f.User).Include(f=>f.members).Select(x => new DTOBookTranstion
            {
                StaffId=x.UserId,
                MemebrId=x.MembersId,
                Id=x.Id,
                BallotType=x.BallotType,
                NameStaff=x.User.UserName,
                NameMember=x.members.Name

            }).ToListAsync();

        }

        public async Task<List<DTOBookTranstionDetail>> GetAllBookTranstionDetail(int Id)
        {
           var bookTranstionDetail=await context.bookTransactionsDetail
                .Include(f=>f.Book)
                .Where(bo=>bo.BookTransactionId==Id)
                .ToListAsync();
            return bookTranstionDetail.Select(x => new DTOBookTranstionDetail
            {
                Id = x.Id,
                BookId=x.Id,
                Quantity=x.Quantity,
                BorrowDate=x.BorrowDate,
                DeadLineDate=x.DeadLineDate,
                NameBook=x.Book!.Title,
                Status = x.ReturnDate.Date == DateTime.MinValue.Date && DateTime.Now.Date > x.DeadLineDate.Date || x.ReturnDate.Date > x.DeadLineDate.Date ? "Đã quá hạn" : string.Empty
            }).ToList();
        }

       

        public async Task<List<DTOBookTranstion>> GetAllUnpaidBook()
        {
             var bookTranstion = await context.bookTransactions.Include(f => f.members)
                 .Include(f => f.User)
                 .Include(f => f.bookTransactionDetails)
                 .Where(bo=>bo.BallotType=="X")
                 .Where(bo => bo.bookTransactionDetails!.Any(bo => bo.ReturnDate.Date == DateTime.MinValue.Date))
                 .ToListAsync();
            return bookTranstion.Select(x => new DTOBookTranstion
            {
                StaffId = x.UserId,
                MemebrId = x.MembersId,
                NameStaff = x.User!.UserName,
                NameMember = x.members!.Name,
                Id = x.Id,
                BallotType = x.BallotType,

            }).ToList();
        }

        public async Task<List<DTOBookTranstionDetail>> UnpaidBookDetail(int Id)
        {
            var bookTranstionDetail = await context.bookTransactionsDetail
                .Include(f => f.Book)
                .Where(bo => bo.BookTransactionId == Id)
                .Where(bo => bo.ReturnDate.Date==DateTime.MinValue)
                .ToListAsync();
            return bookTranstionDetail.Select(x => new DTOBookTranstionDetail
            {
                Id = x.Id,
                BookId = x.Id,
                BorrowDate = x.BorrowDate,
                DeadLineDate = x.DeadLineDate,
                NameBook = x.Book!.Title,
                Status =x.ReturnDate.Date==DateTime.MinValue.Date && DateTime.Now.Date > x.DeadLineDate.Date||x.ReturnDate.Date>x.DeadLineDate.Date? "Đã quá hạn" : string.Empty
            }).ToList();
        }
        public async Task CreateReturnBook(int[] Ids)
        {
            
            var bookExport = await context.bookTransactions
                 .Where(bo => bo.Id == Ids.First()).FirstOrDefaultAsync();
            if(bookExport != null)
            {
                var bookTranstion = new BookTransactions
                {
                    Create_At = DateTime.Now,
                    MembersId = bookExport.MembersId,
                    UserId = bookExport.UserId,
                    BallotType = "N"
                };
                await context.bookTransactions.AddAsync(bookTranstion);
                await context.SaveChangesAsync();
                foreach (var id in Ids)
                {
                    var detail=await context.bookTransactionsDetail.Include(f=>f.Book)
                        .Where(bo=>bo.Id==id).FirstOrDefaultAsync();
                    detail.ReturnDate = DateTime.Now.Date;
                    var booktranstionDetail = new BookTransactionDetail
                    {
                        BookTransactionId = bookTranstion.Id,
                        BookId = detail!.BookId,
                        Quantity = detail.Quantity,
                        ReturnDate=DateTime.Now.Date,
                        
                    };
                    await context.bookTransactionsDetail.AddAsync(booktranstionDetail);
                    await context.SaveChangesAsync();
                }
            }
            

        }
    }
}
