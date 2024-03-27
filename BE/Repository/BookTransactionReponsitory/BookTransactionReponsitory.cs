
using ManagerLibrary.Data;
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;
using ManagerLibrary.Services.ReadJWTService;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;

namespace ManagerLibrary.Repository.BookTransactionReponsitory
{
    public class BookTransactionReponsitory : IBookTransactionReponsitory
    {
        private readonly MyDb context;
        private readonly IReadJWTService readJWTService;

        public BookTransactionReponsitory(MyDb context,IReadJWTService readJWTService) 
        {
            this.context = context;
            this.readJWTService=readJWTService;
        }
        public async Task CreateBookTranstion(BookTranstionModel model)
        {
            var staffid =await readJWTService.ReadJWT();
            var bookTranstion = new BookTransactions
            {
                Create_At = DateTime.Now,
                MembersId=model.MemberId,
                UserId=staffid,
                BallotType="X"
            };
            await context.bookTransactions.AddAsync(bookTranstion);
            await context.SaveChangesAsync();
            foreach(var borrowBook in model.TransitionBookDetail!)
            {
                var book = await context.books.FirstOrDefaultAsync(bo => bo.Id == borrowBook.BookId);
                 if(book!=null)
                {
                    var booktranstionDetail = new BookTransactionDetail
                    {
                        BookTransactionId = bookTranstion.Id,
                        BookId = borrowBook.BookId,
                        Quantity = borrowBook.Quantity,
                        BorrowDate = DateTime.Now.Date,
                        DeadLineDate = borrowBook.DeadLineDate.Date,
                        Price = book.Price+50,
                    };
                    await context.bookTransactionsDetail.AddAsync(booktranstionDetail);
                    await context.SaveChangesAsync();
                }
               
            }
        }

        public async Task<List<DTOBookTranstion>> GetAllBookTranstion(string? BallotType, string?staffId,int? memberId)
        {
            var bookTransaction = context.bookTransactions.Include(f => f.bookTransactionDetails).Include(f => f.User).Include(f => f.members).AsQueryable();
            if(!string.IsNullOrEmpty(staffId))
            {
                bookTransaction = bookTransaction.Where(bo => bo.UserId == staffId);
            }
            if(memberId.HasValue)
            {
                bookTransaction = bookTransaction.Where(bo => bo.MembersId == memberId);
            }
            if(!string.IsNullOrEmpty(BallotType))
            {
                bookTransaction=bookTransaction.Where(bo=>bo.BallotType== BallotType);
            }
            return await bookTransaction.Select(x => new DTOBookTranstion
             {
                 StaffId = x.UserId,
                 MemebrId = x.MembersId,
                 Id = x.Id,
                 BallotType = x.BallotType,
                 NameStaff = x.User!.UserName!,
                 NameMember = x.members!.Name,
                

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
                ReturnDate=x.ReturnDate,
                Price=x.Price,
                Status = x.ReturnDate.Date == DateTime.MinValue&&DateTime.Now.Date>x.DeadLineDate.Date||x.ReturnDate!=DateTime.MinValue&&x.ReturnDate>x.DeadLineDate?
                "Đã quá hạn":x.ReturnDate!=DateTime.MinValue&&x.ReturnDate<=x.DeadLineDate?"Trả đúng hạn":string.Empty
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
                NameStaff = x.User!.UserName!,
                NameMember = x.members!.Name,
                Id = x.Id,
                BallotType = x.BallotType,

            }).ToList();
        }

       
        public async Task CreateReturnBook(ReturnBookModel model)
        {
            
            var bookExport = await context.bookTransactions
                 .Where(bo => bo.Id == model.BookTranstionId).FirstOrDefaultAsync();
            if(bookExport != null)
            {
                var bookTranstion = new BookTransactions
                {
                    Create_At = DateTime.Now,
                    MembersId = bookExport.MembersId,
                    UserId = bookExport.UserId,
                    BallotType = "N",
                    
                    
                };
                await context.bookTransactions.AddAsync(bookTranstion);
                await context.SaveChangesAsync();
                foreach (var id in model.bookDetail)
                {
                    var detail=await context.bookTransactionsDetail.Include(f=>f.Book)
                        .Where(bo=>bo.Id==id).FirstOrDefaultAsync();
                    
                    if(detail!=null)
                    {
                        detail.ReturnDate = DateTime.Now.Date;
                        var booktranstionDetail = new BookTransactionDetail
                        {
                            BookTransactionId = bookTranstion.Id,
                            BookId = detail!.BookId,
                            Quantity = detail.Quantity,
                            ReturnDate = DateTime.Now.Date,
                            Price = DateTime.Now.Date>detail.DeadLineDate?detail.Price-10:detail.Price-5,
                            DeadLineDate=detail.DeadLineDate,
                            BorrowDate=detail.DeadLineDate,


                        };
                        await context.bookTransactionsDetail.AddAsync(booktranstionDetail);
                        await context.SaveChangesAsync();
                    }
                }
            }
            

        }
        public bool IsBorrowBookMember(int Id)
        {
            return  context.bookTransactions.Any(bo => bo.MembersId == Id);
        }
    }
}
