using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Repository.BookTransactionReponsitory;
using ManagerLibrary.Repository.Role;
using ManagerLibrary.Repository.StaffReponsitory;
using ManagerLibrary.Validation;
using ManagerLibraryAPI.Repository.ImportBookReponsitory;
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
        private readonly IRoleRepository roleRepository;
        private readonly IImportBookReponsitory importBookRepository;
        private readonly IBookTransactionReponsitory bookTransactionRepository;

        public StaffController(IStaffReposnitory staffReposnitory,ValidationStaff validations,IRoleRepository roleRepository,
            IImportBookReponsitory importBookReponsitory,IBookTransactionReponsitory bookTransactionReponsitory) 
        {
            this.staffRepository = staffReposnitory;
            this.validations = validations;
            this.roleRepository=roleRepository;
            this.importBookRepository = importBookReponsitory;
            this.bookTransactionRepository = bookTransactionReponsitory;
        }
        [HttpPost]
        [Authorize(Policy ="StaffEditCreate")]
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
        [Authorize(Policy = "StaffEditCreate")]
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
                    UserId = Id,
                    Phone = model.Phone,
                    Email = model.Email,
                    Address = model.Address,
                    Gender = model.Gender,
                    Avatar = model.Avatar,
                    RoleId = model.RoleId,
                    UserName=model.UserName
                    
                    
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
        [Authorize(Policy = "StaffDelete")]
        public async Task<IActionResult> DeteteStaff(string Id)
        {
            try
            {
                var staff = await staffRepository.GetStaff(Id);
                if (staff == null)
                {
                    return NotFound();
                }
                var import=await importBookRepository.GetAllImportBook(Id);
                var export =await bookTransactionRepository.GetAllBookTranstion(null,Id, null);
                if(import.Count>0||export.Count>0)
                {
                    return BadRequest(Repository<string>.WithMessage("Không cho xóa vì nhân viên có tạo đơn hàng", 400));
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
        [Authorize(Policy = "StaffView")]
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
        [HttpGet("Token")]
        [Authorize(Policy = "StaffView")]

        public async Task<IActionResult> GetStaffToken()
        {
            try
            {
                var staff=await staffRepository.GetStaffToken();

                return Ok(Repository<DTOStaff>.WithData(staff, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize(Policy = "StaffView")]
        public async Task<IActionResult> GetAllStaff(string?search,string?roleId)
        {
            try
            {
                if(!string.IsNullOrEmpty(roleId))
                {
                    var role = await roleRepository.GetRole(roleId);
                    if(role == null)
                    {
                        return NotFound(Repository<string>.WithMessage("Không tìm thấy roleid",404));
                    }
                }

                var staff = await staffRepository.GetAllStaff(search,roleId);
                
                return Ok(Repository<List<DTOStaff>>.WithData(staff, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
