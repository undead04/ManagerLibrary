using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
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
    public class StaffController : ControllerBase
    {
        private readonly IStaffReposnitory staffRepository;
        private readonly ValidationStaff validations;

        public StaffController(IStaffReposnitory staffReposnitory,ValidationStaff validations) 
        {
            this.staffRepository = staffReposnitory;
            this.validations = validations;
        }
        [HttpPost]
        
        public async Task<IActionResult> CreateStaff([FromForm]StaffModel model)
        {
            try
            {
                var validationStaff = new ValidationStaffModel
                {
                    UserName= model.UserName,
                    Password=model.Password,
                    UserId = string.Empty,
                    Phone=model.Phone,
                    Email=model.Email,
                    Address=model.Address,
                    Gender=model.Gender,
                    Avatar=model.Avatar,
                    RoleId=model.RoleId
                };
                var validationResult = validations.Validate(validationStaff);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));

                }
                await staffRepository.CreateStaff(model);
                return Ok(Repository<string>.WithMessage("Tạo nhân viên thành công",200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{Id}")]
        
        public async Task<IActionResult> UpdateStaff(string Id, [FromForm] StaffModel model)
        {
            try
            {
                var staff =await staffRepository.GetStaff(Id);
                if(staff==null)
                {
                    return NotFound();
                }
                var validationStaff = new ValidationStaffModel
                {
                    UserId = string.Empty,
                    Phone = model.Phone,
                    Email = model.Email,
                    Address = model.Address,
                    Gender = model.Gender,
                    Avatar = model.Avatar,
                    RoleId = model.RoleId
                };
                var validationResult = validations.Validate(validationStaff);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));

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
