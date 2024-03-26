using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.BookTransactionReponsitory;
using ManagerLibrary.Repository.MemberReposnitory;
using ManagerLibrary.Repository.StaffReponsitory;
using ManagerLibrary.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookTransitionController : ControllerBase
    {
        private readonly IBookTransactionReponsitory bookTransactionRepository;
        private readonly IMemberReponsitory memberRepository;
        private readonly IStaffReposnitory staffRepository;
        private readonly ValidationBookTranstion validations;

        public BookTransitionController(IBookTransactionReponsitory bookTransactionReponsitory,IMemberReponsitory memberReponsitory,
            IStaffReposnitory staffReposnitory,ValidationBookTranstion validations)
        {
            this.bookTransactionRepository = bookTransactionReponsitory;
            this.memberRepository=memberReponsitory;
            this.staffRepository = staffRepository;
            this.validations = validations;
        }
        [HttpPost]
        [Authorize(Policy = "BorrowEditCreate")]
        public async Task<IActionResult> CreateBrrowBook(BookTranstionModel model)
        {
            try
            {
                var validationResult = validations.Validate(model);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));

                }
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
        public async Task<IActionResult> CreateExportBook(ReturnBookModel model)
        {
            try
            {
                
                await bookTransactionRepository.CreateReturnBook(model);
                return Ok(Repository<string>.WithMessage("Tạo hóa đơn thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize(Policy = "BorrowView")]
        public async Task<IActionResult> GetAll(string? ballotType,string?staffId,int? memberId)
        {
            try
            {
                if(!string.IsNullOrEmpty(staffId))
                {
                    var staff = await staffRepository.GetStaff(staffId);
                    if(staff==null)
                    {
                        return NotFound(Repository<string>.WithMessage("Không tìm thấy staffid",404));
                    }
                }
                if (memberId.HasValue)
                {
                    int memberIdValue = memberId.Value;
                    var member = await memberRepository.GetMember(memberIdValue);
                    if (member == null)
                    {
                        return NotFound(Repository<string>.WithMessage("Không tìm thấy memberid", 404));
                    }
                }
                var order = await bookTransactionRepository.GetAllBookTranstion(ballotType, staffId, memberId);
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
        
    }
}
