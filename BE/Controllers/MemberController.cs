using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.MemberReposnitory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IMemberReponsitory memberReponsitory;

        public MemberController(IMemberReponsitory memberReponsitory) 
        { 
            this.memberReponsitory=memberReponsitory;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllMember()
        {
            try
            {
                var member=await memberReponsitory.GetAllMember();
                return Ok(Repository<List<DTOMember>>.WithData(member, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetMember(int Id)
        {
            try
            {
                var member = await memberReponsitory.GetMember(Id);
                if(member== null)
                {
                    return NotFound();
                }
                return Ok(Repository<DTOMember>.WithData(member, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateMember([FromForm]MemberModel model)
        {
            try
            {
                 await memberReponsitory.CreateMember(model);
                
                return Ok(Repository<string>.WithMessage("Thêm đọc giả thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateMember(int Id,MemberModel model)
        {
            try
            {
                var member = await memberReponsitory.GetMember(Id);
                if(member==null)
                {
                    return NotFound();
                }
                await memberReponsitory.UpdateMember(Id,model);
                return Ok(Repository<string>.WithMessage("Cập nhật đọc giả thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteMember(int Id)
        {
            try
            {
                var member = await memberReponsitory.GetMember(Id);
                if (member == null)
                {
                    return NotFound();
                }
                await memberReponsitory.DeleteMember(Id);
                return Ok(Repository<string>.WithMessage("Xóa đọc giả thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
