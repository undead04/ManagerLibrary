using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;

namespace ManagerLibrary.Services.AccountService
{
    public interface IAccountService
    {
        Task<DTOLogin> SignIn(SignInModel model);
        Task<string> CreateToken(SignInModel model);
    }
}
