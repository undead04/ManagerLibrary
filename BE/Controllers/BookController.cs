using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.BookReponsitory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookReponsitory bookReponsitory;

        public BookController(IBookReponsitory bookReponsitory)
        {
            this.bookReponsitory=bookReponsitory;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBook()
        {
            try
            {
                var book = await bookReponsitory.getAllBook();
                return Ok(Repository<List<DTOBook>>.WithData(book,200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetBook(int Id)
        {
            try
            {
                var book = await bookReponsitory.getBook(Id);
                if (book == null)
                {
                    return NotFound();
                }
                return Ok(Repository<DTOBook>.WithData(book, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateBook([FromForm]BookModel model)
        {
            try
            {
                await bookReponsitory.createBook(model);
                return Ok(Repository<string>.WithMessage("Thêm sách thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateBook(int Id,[FromForm]BookModel model)
        {
            try
            {
                var book =await bookReponsitory.getBook(Id);
                if (book == null)
                {
                    return NotFound();
                }
                await bookReponsitory.updateBook(Id,model);
                return Ok(Repository<string>.WithMessage("Cập nhật sách thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteBook(int Id)
        {
            try
            {
                var book =await bookReponsitory.getBook(Id);
                if (book == null)
                {
                    return NotFound();
                }
                await bookReponsitory.deleteBook(Id);
                return Ok(Repository<string>.WithMessage("Xóa sách thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
