using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Repository.BookReponsitory;
using ManagerLibrary.Repository.MemberReposnitory;
using ManagerLibrary.Services.StatisticalService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticalController : ControllerBase
    {
        private readonly IStatisticalServer statisticalServer;
        private readonly IMemberReponsitory memberRepository;
        private readonly IBookReponsitory bookRepository;

        public StatisticalController(IStatisticalServer statisticalServer,IMemberReponsitory memberReponsitory,IBookReponsitory bookReponsitory) 
        { 
            this.statisticalServer=statisticalServer;
            this.memberRepository = memberReponsitory;
            this.bookRepository=bookReponsitory;
        }
        [HttpGet("topbook")]
        [Authorize(Policy = "IncomeView")]
        public async Task<IActionResult> TopBorrow(DateTime? from,DateTime? to, string? search)
        {
            try
            {
                var book=await statisticalServer.TopBook(from, to,search);
                return Ok(Repository<List<DTOTopBook>>.WithData(book,200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("borrowbook/{memberId}")]
        [Authorize(Policy = "IncomeView")]
        public async Task<IActionResult> BorrowBook(int memberId)
        {
            try
            {
                var member = await memberRepository.GetMember(memberId);
                if (member == null)
                {
                    return NotFound();
                }
                var book = await statisticalServer.BorrowBook(memberId);
                return Ok(Repository<List<DTOTopBook>>.WithData(book, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("book/{bookId}")]
        [Authorize(Policy = "IncomeView")]
        public async Task<IActionResult> BookStatistis(int bookId)
        {
            try
            {
                var book = await bookRepository.getBook(bookId);
                if(book==null)
                {
                    return NotFound();
                }
                var member = await statisticalServer.BookStatistis(bookId);
                return Ok(Repository<BookStatisticsDTO>.WithData(member, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("Statistis")]
        [Authorize(Policy = "IncomeView")]
        public async Task<IActionResult> Statistis()
        {
            try
            {
                
                var statis = await statisticalServer.Statistical();
                return Ok(Repository<StatisticalModel>.WithData(statis, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("topCategory")]
        [Authorize(Policy = "IncomeView")]
        public async Task<IActionResult> TopCategory(DateTime?from,DateTime?to, string? search)
        {
            try
            {

                var statis = await statisticalServer.TopCategory(from,to, search);
                return Ok(Repository<List<TopCategoryDTO>>.WithData(statis, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("topMemberLate")]
        [Authorize(Policy = "IncomeView")]
        public async Task<IActionResult> TopMemberLate(DateTime? from, DateTime? to,string?search)
        {
            try
            {

                var statis = await statisticalServer.TopLateMember(from, to,search);
                return Ok(Repository<List<TopMembeDemurragerDTO>>.WithData(statis, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("topMemberLateDetail/{memberId}")]
        [Authorize(Policy = "IncomeView")]
        public async Task<IActionResult> TopMemberLateDetail(int memberId)
        {
            try
            {

                var statis = await statisticalServer.DetailLate(memberId);
                return Ok(Repository<TopMembeDemurragerDetailDTO>.WithData(statis, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
