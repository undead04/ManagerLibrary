using ManagerLibrary.Data;

namespace ManagerLibrary.Services.ReadJWTService
{
    public interface IReadJWTService
    {
        Task<string> ReadJWT();
    }
}
