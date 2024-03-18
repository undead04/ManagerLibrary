
using ManagerLibrary.Data;
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Repository.BookReponsitory;
using ManagerLibrary.Services.UpLoadService;
using Microsoft.EntityFrameworkCore;

namespace ManagerLibrary.Repository.BookReponsitory
{
    public class BookReponsitory : IBookReponsitory
    {
        private readonly MyDb context;
        private readonly IUploadService uploadService;

        public BookReponsitory(MyDb context,IUploadService uploadService) 
        {
            this.context = context;
            this.uploadService = uploadService;
        }
        public async Task createBook(BookModel model)
        {
            var book = new Book
            {
                ISBN = model.ISBN,
                Title = model.Title,
                Author = model.Author,
                PublishedYear = model.PublishedYear,
                Price = model.Price,
                CategoryId = model.CategoryId,
            };
            await context.books.AddAsync(book);
            await context.SaveChangesAsync();
            if(model.Image!=null)
            {
                if (model.Image.Length > 0)
                {
                    string newImage = await uploadService.UploadImage(book.Id,"Book",model.Image);
                    book.Image = newImage;
                    await context.SaveChangesAsync();
                }

            }
        }

        public async Task deleteBook(int id)
        {
            var book = await context.books.FirstOrDefaultAsync(bo => bo.Id == id);
            if(book!=null)
            {
                uploadService.DeleteImage("Book", book.Image);
                context.Remove(book);
                await context.SaveChangesAsync();
                
            }
        }

        public async Task<DTOBook> getBook(int id)
        {
            var book = await context.books.Where(bo => bo.Status == true).FirstOrDefaultAsync(bo => bo.Id == id);
            if(book==null)
            {
                return null;
            }
            return new DTOBook
            {
                Title = book.Title,
                ISBN = book.ISBN,
                Price = book.Price,
                Author = book.Author,
                CategoryId = book.CategoryId,
                Id = book.Id,
                PublishedYear = book.PublishedYear,
                Image = book.Image,
                UrlImage = uploadService.GetUrlImage(book.Image),
                
            };
        }

        public async Task updateBook(int id, BookModel model)
        {
            var book = await context.books.Where(bo => bo.Status == true).FirstOrDefaultAsync(bo => bo.Id == id);
            if(book!=null)
            {
                book.Title = model.Title;
                book.ISBN = model.ISBN;
                book.Price = model.Price;
                book.PublishedYear = model.PublishedYear;
                book.Author = model.Author;
                book.CategoryId = model.CategoryId;
               
                await context.SaveChangesAsync();    
                if (model.Image != null)
                {
                    if(model.Image.Length > 0)
                    {
                        uploadService.DeleteImage("Book", book.Image);
                        string newImage= await uploadService.UploadImage(book.Id, "Book", model.Image);
                        book.Image = newImage;
                        await context.SaveChangesAsync();
                    }

                }
            }

           
        }
       public async Task<List<DTOBook>> getAllBook()
        {
            return await context.books.Where(bo => bo.Status == true).Select(bo => new DTOBook
            {
                Id = bo.Id,
                ISBN = bo.ISBN,
                Title = bo.Title,
                Author = bo.Author,
                CategoryId = bo.CategoryId,
                PublishedYear = bo.PublishedYear,
                Image = bo.Image,
                Price=bo.Price,
                UrlImage=uploadService.GetUrlImage(bo.Image)
            }).ToListAsync();
        }
    }
}
