using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;

namespace ManagerLibrary.Repository.Role
{
    public interface IRoleRepository
    {
        Task CreateRole(RoleModel model);
        Task DeleteRole(string Id);
        Task UpdateRole(string Id,RoleModel model);
        Task<List<RoleDTO>> GetAllRole();
        Task<RoleDTO>GetRole(string Id);
    }
}
