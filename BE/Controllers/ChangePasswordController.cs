using FluentValidation.Results;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.PasswordRepository;
using ManagerLibrary.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChangePasswordController : ControllerBase
    {
        private readonly IPasswordRepository passwprdRepository;
        private readonly ValidationChanglePassword validations;

        public ChangePasswordController(IPasswordRepository passwordRepository,ValidationChanglePassword validations) 
        {
            this.passwprdRepository=passwordRepository;
            this.validations = validations;
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            try
            {
                ValidationResult result = validations.Validate(model);
                if (!result.IsValid)
                {
                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(result.Errors.ToDictionary(e => e.PropertyName, e => e.ErrorMessage), 400));

                }
                await passwprdRepository.ChangePassword(model);
                return Ok(Repository<string>.WithMessage("Đôi mật khẩu thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
