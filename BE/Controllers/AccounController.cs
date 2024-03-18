using ManagerLibrary.Models;
using ManagerLibrary.Services.AccountService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccounController : ControllerBase
    {
        private readonly IAccountService accountService;

        public AccounController(IAccountService accountService) 
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
                    return BadRequest(Repository<string>.WithMessage("Sai mật khẩu hoặc mật khẩu", 200));
                }

                return Ok(Repository<string>.WithData(token, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
