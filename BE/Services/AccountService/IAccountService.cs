using ManagerLibrary.Models;

namespace ManagerLibrary.Services.AccountService
{
    public interface IAccountService
    {
        Task<string> SignIn(SignInModel model);
        Task<string> CreateToken(SignInModel model);
    }
}
