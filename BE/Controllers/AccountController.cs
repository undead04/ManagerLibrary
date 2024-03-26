using ManagerLibrary.Models;
using ManagerLibrary.Services.AccountService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models.DTO;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService) 
        { 
            this.accountService=accountService;
        }
        [HttpPost]
        public async Task<IActionResult> SignIn(SignInModel model)
        {
            try
            {
                var token = await accountService.SignIn(model);
                if (token == null)
                {
                    return BadRequest(Repository<string>.WithMessage("Sai mật khẩu hoặc email", 400));
                }

                return Ok(Repository<DTOLogin>.WithData(token, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
