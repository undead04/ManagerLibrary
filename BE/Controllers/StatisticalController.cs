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
        public async Task<IActionResult> TopBorrow(DateTime from,DateTime to)
        {
            try
            {
                var book=await statisticalServer.TopBook(from, to);
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
        [HttpGet("book/{bokId}")]
        [Authorize(Policy = "IncomeView")]
        public async Task<IActionResult> BookStatistis(int bokId)
        {
            try
            {
                var book = await bookRepository.getBook(bokId);
                if(book==null)
                {
                    return NotFound();
                }
                var member = await statisticalServer.BookStatistis(bokId);
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
    }
}
