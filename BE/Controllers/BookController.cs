using FluentValidation.Results;
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.BookReponsitory;
using ManagerLibrary.Validation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookReponsitory bookReponsitory;
        private readonly ValidationBook validation;

        public BookController(IBookReponsitory bookReponsitory, ValidationBook validations)
        {
            this.bookReponsitory = bookReponsitory;
            this.validation = validations;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBook(string? search, int? categoryId)
        {
            try
            {
                var book = await bookReponsitory.getAllBook(search, categoryId);
                return Ok(Repository<List<DTOBook>>.WithData(book, 200));
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
        public async Task<IActionResult> CreateBook([FromForm] BookModel model)
        {
            try
            {
                var validationBook = new ValidationBookModel
                {
                    Id = 0,
                    Title = model.Title,
                    Author = model.Author,
                    ISBN = model.ISBN,
                    PublishedYear = model.PublishedYear,
                    Price = model.Price,
                    CategoryId = model.CategoryId,
                    Image = model.Image
                };
                ValidationResult validationResult = validation.Validate(validationBook);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);
                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));
                }
                int id = await bookReponsitory.createBook(model);
                return Ok(Repository<int>.WithData(id, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateBook(int Id, [FromForm] BookModel model)
        {
            try
            {
                var book = await bookReponsitory.getBook(Id);
                if (book == null)
                {
                    return NotFound();
                }
                var validationBook = new ValidationBookModel
                {
                    Id = Id,
                    Title = model.Title,
                    Author = model.Author,
                    ISBN = model.ISBN,
                    PublishedYear = model.PublishedYear,
                    Price = model.Price,
                    CategoryId = model.CategoryId,
                    Image = model.Image
                };
                ValidationResult validationResult = validation.Validate(validationBook);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);
                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));
                }
                await bookReponsitory.updateBook(Id, model);
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
                var book = await bookReponsitory.getBook(Id);
                if (book == null)
                {
                    return NotFound();
                }
                if (book.Quatity > 0)
                {
                    return BadRequest(Repository<string>.WithMessage("Không thể xóa sách", 400));
                }
                await bookReponsitory.deleteBook(Id);
                return Ok(Repository<string>.WithMessage("Xóa sách thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("stopPublishing/{id}")]
        public async Task<IActionResult> StopPublishing(int id)
        {
            try
            {
                var book =await bookReponsitory.getBook(id);
                if (book==null) { return NotFound(); }
                await bookReponsitory.StopPublishing(id);
                return Ok(Repository<string>.WithMessage("Dừng phát hành thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
