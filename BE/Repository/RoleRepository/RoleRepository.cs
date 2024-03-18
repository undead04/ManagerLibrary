using ManagerLibrary.Data;
using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Repository.Role;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ManagerLibrary.Repository.RoleRepository
{
    public class RoleRepository : IRoleRepository
    {
        private RoleManager<IdentityRole> roleManager;

        public RoleRepository(RoleManager<IdentityRole> roleManager) 
        {
            this.roleManager = roleManager;
        }
        public async Task CreateRole(RoleModel model)
        {
            var role = new Data.Role
            {
                Name = model.Name,
            };
            var result = await roleManager.CreateAsync(role);
        }

        public async Task DeleteRole(string Id)
        {
            var role = await roleManager.FindByIdAsync(Id);

            if (role != null)
            {
                var result = await roleManager.DeleteAsync(role);

                
            }
        }

        public async Task<List<RoleDTO>> GetAllRole()
        {
            var roles = await roleManager.Roles.ToListAsync();
            return roles.Select(ro =>new RoleDTO
            {
                Id= ro.Id,
                Name=ro.Name
            }).ToList();
        }

        public async Task UpdateRole(string Id, RoleModel model)
        {
            var role = await roleManager.FindByIdAsync(Id);

            if (role != null)
            {
                role.Name = model.Name;
                var result = await roleManager.UpdateAsync(role);
            }
        }
        public async Task<RoleDTO> GetRole(string Id)
        {
            var role = await roleManager.FindByIdAsync(Id);
            if(role==null)
            {
                return null;
            }
            return new RoleDTO
            {
                Id = role.Id,
                Name = role.Name
            };

        }
    }
}
