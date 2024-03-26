using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Repository.Role;
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
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository roleRepository;
        private readonly ValidationRole _validations;
        private readonly IStaffReposnitory staffRepository;

        public RoleController(IRoleRepository roleRepository,ValidationRole validations,IStaffReposnitory staffReposnitory) 
        { 
            this.roleRepository=roleRepository;
            _validations = validations;
            this.staffRepository = staffReposnitory;
        }
        [HttpPost]
        
        public async Task<IActionResult> CreateRole(RoleModel model)
        {
            try
            {
                var validationValue = new ValidationRoleModel
                {
                    Id=string.Empty,
                    Name=model.Name,
                    claims=new ClaimsModel
                    {
                        IsBookRead=model.claims!.IsBookRead,
                        IsBookEditAndCreate=model.claims!.IsBookEditAndCreate,
                        IsBookDelete=model.claims!.IsBookDelete,
                        IsCategoryRead = model.claims!.IsCategoryRead,
                        IsCategoryEditAndCreate = model.claims!.IsCategoryEditAndCreate,
                        IsCategoryDelete = model.claims!.IsCategoryDelete,
                        IsMemberRead = model.claims!.IsMemberRead,
                        IsMemberEditAndCreate = model.claims!.IsMemberEditAndCreate,
                        IsMemberDelete = model.claims!.IsMemberDelete,
                        IsStaffRead = model.claims!.IsStaffRead,
                        IsStaffEditAndCreate = model.claims!.IsStaffEditAndCreate,
                        IsStaffDelete = model.claims!.IsStaffDelete,
                        IsBorrowBookRead = model.claims!.IsBorrowBookRead,
                        IsBorrowBookCreateAndEdit = model.claims!.IsBorrowBookCreateAndEdit,
                        IsImportBookCreate = model.claims!.IsImportBookCreate,
                        IsImportBookRead = model.claims!.IsImportBookRead,
                        IsIncomeRead = model.claims!.IsIncomeRead,
                    }
                };
                var validationResult = _validations.Validate(validationValue);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));

                }
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
                var validationValue = new ValidationRoleModel
                {
                    Id = Id,
                    Name = model.Name,
                    claims = new ClaimsModel
                    {
                        IsBookRead = model.claims!.IsBookRead,
                        IsBookEditAndCreate = model.claims!.IsBookEditAndCreate,
                        IsBookDelete = model.claims!.IsBookDelete,
                        IsCategoryRead = model.claims!.IsCategoryRead,
                        IsCategoryEditAndCreate = model.claims!.IsCategoryEditAndCreate,
                        IsCategoryDelete = model.claims!.IsCategoryDelete,
                        IsMemberRead = model.claims!.IsMemberRead,
                        IsMemberEditAndCreate = model.claims!.IsMemberEditAndCreate,
                        IsMemberDelete = model.claims!.IsMemberDelete,
                        IsStaffRead = model.claims!.IsStaffRead,
                        IsStaffEditAndCreate = model.claims!.IsStaffEditAndCreate,
                        IsStaffDelete = model.claims!.IsStaffDelete,
                        IsBorrowBookRead = model.claims!.IsBorrowBookRead,
                        IsBorrowBookCreateAndEdit = model.claims!.IsBorrowBookCreateAndEdit,
                        IsImportBookCreate = model.claims!.IsImportBookCreate,
                        IsImportBookRead = model.claims!.IsImportBookRead,
                        IsIncomeRead = model.claims!.IsIncomeRead,
                    }
                };
                var validationResult = _validations.Validate(validationValue);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));

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
                var staff =await staffRepository.GetAllStaff(null, Id);
                if(staff.Count>0)
                {
                    return BadRequest(Repository<string>.WithMessage("Không được phép xóa do vai trò này đã có người",400));
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
