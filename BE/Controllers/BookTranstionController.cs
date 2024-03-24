using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.BookTransactionReponsitory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookTranstionController : ControllerBase
    {
        private readonly IBookTransactionReponsitory bookTransactionRepository;

        public BookTranstionController(IBookTransactionReponsitory bookTransactionReponsitory)
        {
            this.bookTransactionRepository = bookTransactionReponsitory;
        }
        [HttpPost]
        [Authorize(Policy = "BorrowEditCreate")]
        public async Task<IActionResult> CreateBrrowBook(BookTranstionModel model)
        {
            try
            {
                await bookTransactionRepository.CreateBookTranstion(model);
                return Ok(Repository<string>.WithMessage("Tạo hóa đơn thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("Export")]
        [Authorize(Policy = "BorrowEditCreate")]
        public async Task<IActionResult> CreateExportBook([FromBody] int[] Id)
        {
            try
            {
                await bookTransactionRepository.CreateReturnBook(Id);
                return Ok(Repository<string>.WithMessage("Tạo hóa đơn thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize(Policy = "BorrowView")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var order = await bookTransactionRepository.GetAllBookTranstion();
                return Ok(Repository<List<DTOBookTranstion>>.WithData(order, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{Id}")]
        [Authorize(Policy = "BorrowView")]
        public async Task<IActionResult> GetAllDetail(int Id)
        {
            try
            {
                var order = await bookTransactionRepository.GetAllBookTranstionDetail(Id);
                return Ok(Repository<List<DTOBookTranstionDetail>>.WithData(order, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("UnpaidBook")]
        [Authorize(Policy = "BorrowView")]
        public async Task<IActionResult> GetAllUnaidbook()
        {
            try
            {
                var order = await bookTransactionRepository.GetAllUnpaidBook();
                return Ok(Repository<List<DTOBookTranstion>>.WithData(order, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("UnpaidBook/{Id}")]
        [Authorize(Policy = "BorrowView")]
        public async Task<IActionResult> GetAllUnaidbook(int Id)
        {
            try
            {
                var order = await bookTransactionRepository.UnpaidBookDetail(Id);
                return Ok(Repository<List<DTOBookTranstionDetail>>.WithData(order, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
