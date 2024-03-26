using ManagerLibrary.Models;

namespace ManagerLibrary.Repository.PasswordRepository
{
    public interface IPasswordRepository
    {
        string CreatePassword();
        Task ChangePassword(ChangePasswordModel mdoe);
    }
}
