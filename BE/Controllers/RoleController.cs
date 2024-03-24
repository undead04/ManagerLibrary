using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Repository.Role;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository roleRepository;

        public RoleController(IRoleRepository roleRepository) 
        { 
            this.roleRepository=roleRepository;
        }
        [HttpPost]
        [Authorize(Policy = "BorrowView")]
        public async Task<IActionResult> CreateRole(RoleModel model)
        {
            try
            {
                await roleRepository.CreateRole(model);
                return Ok(Repository<string>.WithMessage("Tạo vai trò thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateRole(string Id,RoleModel model)
        {
            try
            {
                var role = await roleRepository.GetRole(Id);
                if(role==null)
                {
                    return NotFound();
                }
                await roleRepository.UpdateRole(Id,model);
                return Ok(Repository<string>.WithMessage("Cập nhật vai trò thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteRole(string Id)
        {
            try
            {
                var role = await roleRepository.GetRole(Id);
                if (role == null)
                {
                    return NotFound();
                }
                await roleRepository.DeleteRole(Id);
                return Ok(Repository<string>.WithMessage("Xóa vai trò thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetRole(string Id)
        {
            try
            {
                var role = await roleRepository.GetRole(Id);
                if (role == null)
                {
                    return NotFound();
                }
               
                return Ok(Repository<RoleDetailDTO>.WithData(role, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllRole()
        {
            try
            {
                var role = await roleRepository.GetAllRole();
                

                return Ok(Repository<List<RoleDTO>>.WithData(role, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
