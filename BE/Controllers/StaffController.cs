using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Repository.StaffReponsitory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffReposnitory staffRepository;

        public StaffController(IStaffReposnitory staffReposnitory) 
        {
            this.staffRepository = staffReposnitory;
        }
        [HttpPost]
        public async Task<IActionResult> CreateStaff(StaffModel model)
        {
            try
            {
                await staffRepository.CreateStaff(model);
                return Ok(Repository<string>.WithMessage("Tạo nhân viên thành công",200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateStaff(string Id, StaffModel model)
        {
            try
            {
                var staff =await staffRepository.GetStaff(Id);
                if(staff==null)
                {
                    return NotFound();
                }
                await staffRepository.UpdateStaff(Id,model);
                return Ok(Repository<string>.WithMessage("Cập nhật nhân viên thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeteteStaff(string Id)
        {
            try
            {
                var staff = await staffRepository.GetStaff(Id);
                if (staff == null)
                {
                    return NotFound();
                }
                await staffRepository.DeleteStaff(Id);
                return Ok(Repository<string>.WithMessage("Xóa nhân viên thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetStaff(string Id)
        {
            try
            {
                var staff = await staffRepository.GetStaff(Id);
                if (staff == null)
                {
                    return NotFound();
                }
                
                return Ok(Repository<DTOStaff>.WithData(staff, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllStaff()
        {
            try
            {
                var staff = await staffRepository.GetAllStaff();
                
                return Ok(Repository<List<DTOStaff>>.WithData(staff, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
