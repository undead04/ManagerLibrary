
using ManagerLibrary.Data;
using ManagerLibrary.Model;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Services.ReadJWTService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ManagerLibraryAPI.Repository.ImportBookReponsitory
{

    public class ImportBookReponsitory : IImportBookReponsitory
    {
        private readonly MyDb context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IReadJWTService readJWTService;
        private readonly ClaimsPrincipal _user;

        public ImportBookReponsitory(MyDb context,UserManager<ApplicationUser> userManager, IReadJWTService readJWTService) 
        {
            this.context = context;
            this.userManager = userManager;
            this.readJWTService = readJWTService;
        }
        public async Task CreateImportBook(ImportBookMode model)
        {
            var userId =await readJWTService.ReadJWT();
            var importBook = new ImportReceipts
            {
                Create_At = DateTime.Now,
                UserId = userId

            };
            await context.importReceipts.AddAsync(importBook);
            await context.SaveChangesAsync();
            foreach(var book in model.importBookDetails!)
            {
                
                var importBookDetail = new ImportReceiptsDetail
                {
                    ImportReceiptId=importBook.Id,
                    BookId = book.BookId,
                    Price= book.Price,
                    Quantity = book.Quantity,
                };
                await context.importReceiptsDetails.AddAsync(importBookDetail);
                await context.SaveChangesAsync();
            }
        }

        public async Task<List<DTOImportBook>> GetAllImportBook(string? staffId)
        {
            var importBook = await context.importReceipts.Include(f=>f.User).ToListAsync();
            if (!string.IsNullOrEmpty(staffId))
            {
                importBook = importBook.Where(im => im.UserId == staffId).ToList();
            }
            return importBook.Select(im => new DTOImportBook
            {
                Id=im.Id,
                Create_At=im.Create_At,
                UserName=im.User!.UserName!,
                
            }).ToList();
           

        }

        public async Task<List<DTOImportBookDetail>> GetImportBookDetail(int Id)
        {
           var importBookDetail=await context.importReceiptsDetails.Include(f=>f.Book).Where(im=>im.ImportReceiptId==Id).ToListAsync();
            if(importBookDetail!=null)
            {
                return importBookDetail.Select(im => new DTOImportBookDetail
                {
                    Id = im.Id,
                    ImportReceiptId=im.ImportReceiptId,
                    NameBook = im.Book.Title,
                    Price = im.Price,
                    Quantity = im.Quantity,
                    BookId=im.BookId
                }).ToList();
            }
            return null;
        }
    }
}
