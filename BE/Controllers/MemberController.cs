using FluentValidation.Results;
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.BookTransactionReponsitory;
using ManagerLibrary.Repository.MemberReposnitory;
using ManagerLibrary.Services.StatisticalService;
using ManagerLibrary.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IMemberReponsitory memberReponsitory;
        private readonly ValidationMember validation;
        private readonly IBookTransactionReponsitory transtionRepository;
        private readonly IStatisticalServer statiscalServer;

        public MemberController(IMemberReponsitory memberReponsitory,ValidationMember validations,IBookTransactionReponsitory transactionReponsitory) 
        { 
            this.memberReponsitory=memberReponsitory;
            this.validation = validations;
            this.transtionRepository = transactionReponsitory;
            
        }
        [HttpGet]
        [Authorize(Policy = "MemberView")]
        public async Task<IActionResult> GetAllMember(string?search)
        {
            try
            {
                var member=await memberReponsitory.GetAllMember(search);
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
                var ValidationMember = new ValidationMemberModel
                {
                    Address = model.Address,
                    Phone=model.Phone,
                    Id=0,
                    Gender=model.Gender,
                    Avatar=model.Avatar,
                    Name=model.Name,
                    
                };
                ValidationResult validationResult = validation.Validate(ValidationMember);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));

                }
                int id= await memberReponsitory.CreateMember(model);
                return Ok(Repository<int>.WithData(id, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateMember(int Id,[FromForm]MemberModel model)
        {
            try
            {
                var member = await memberReponsitory.GetMember(Id);
                if(member==null)
                {
                    return NotFound();
                }
                var ValidationMember = new ValidationMemberModel
                {
                    Address = model.Address,
                    Phone = model.Phone,
                    Id = Id,
                    Gender = model.Gender,
                    Avatar = model.Avatar,
                    Name = model.Name,

                };
                ValidationResult validationResult = validation.Validate(ValidationMember);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));

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
                if (transtionRepository.IsBorrowBookMember(Id))
                {
                    return BadRequest(Repository<string>.WithMessage("Không được xóa khách hàng", 200));
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
