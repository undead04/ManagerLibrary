using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using Microsoft.AspNetCore.Identity;

namespace ManagerLibrary.Repository.StaffReponsitory
{
    public interface IStaffReposnitory
    {
        Task<string> CreateStaff(StaffModel model);
        Task<List<DTOStaff>> GetAllStaff(string?search,string? roleId);
        Task<DTOStaff> GetStaff(string Id);
        Task DeleteStaff(string Id);
        Task UpdateStaff(string Id,StaffModel model);
        Task<DTOStaff> GetStaffToken();
    }
}
