using ManagerLibrary.Data;
using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Repository.Role;
using ManagerLibrary.Services.ClaimsService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ManagerLibrary.Repository.RoleRepository
{
    public class RoleRepository : IRoleRepository
    {
        private RoleManager<IdentityRole> roleManager;
        private readonly IClaimsService claimsSerivce;

        public RoleRepository(RoleManager<IdentityRole> roleManager,IClaimsService claimsService) 
        {
            this.roleManager = roleManager;
            this.claimsSerivce = claimsService;
        }
        public async Task CreateRole(RoleModel model)
        {
            var role = new IdentityRole(model.Name);
            var result = await roleManager.CreateAsync(role);
            if (result.Succeeded)
            {
                if (model.claims!.IsBookRead)
                {
                    await claimsSerivce.CreateClaims(role,"book","view");
                }
                if(model.claims!.IsBookEditAndCreate)
                {
                    await claimsSerivce.CreateClaims(role, "book", "editcreate");
                }
                if (model.claims!.IsBookDelete)
                {
                    await claimsSerivce.CreateClaims(role, "book", "delete");
                }
                if (model.claims!.IsCategoryRead)
                {
                    await claimsSerivce.CreateClaims(role, "category", "view");
                }
                if (model.claims!.IsCategoryEditAndCreate)
                {
                    await claimsSerivce.CreateClaims(role, "category", "editcreate");
                }
                if (model.claims!.IsCategoryDelete)
                {
                    await claimsSerivce.CreateClaims(role, "category", "delete");
                }
                if (model.claims!.IsMemberRead)
                {
                    await claimsSerivce.CreateClaims(role, "member", "view");
                }
                if (model.claims!.IsMemberEditAndCreate)
                {
                    await claimsSerivce.CreateClaims(role, "member", "editcreate");
                }
                if (model.claims!.IsMemberDelete)
                {
                    await claimsSerivce.CreateClaims(role, "member", "delete");
                }
                if (model.claims!.IsStaffRead)
                {
                    await claimsSerivce.CreateClaims(role, "staff", "view");
                }
                if (model.claims!.IsStaffEditAndCreate)
                {
                    await claimsSerivce.CreateClaims(role, "staff", "editcreate");
                }
                if (model.claims!.IsStaffDelete)
                {
                    await claimsSerivce.CreateClaims(role, "staff", "delete");
                }
                if (model.claims!.IsBorrowBookRead)
                {
                    await claimsSerivce.CreateClaims(role, "borrow", "view");
                }
                if (model.claims!.IsBorrowBookCreateAndEdit)
                {
                    await claimsSerivce.CreateClaims(role, "borrow", "editcreate");
                }
                if (model.claims!.IsBorrowBookRead)
                {
                    await claimsSerivce.CreateClaims(role, "income", "view");
                }
                if (model.claims!.IsImportBookCreate)
                {
                    await claimsSerivce.CreateClaims(role, "import", "editcreate");
                }
                if (model.claims!.IsImportBookRead)
                {
                    await claimsSerivce.CreateClaims(role, "import", "view");
                }
                if (model.claims!.IsRoleRead)
                {
                    await claimsSerivce.CreateClaims(role, "role", "view");
                }
                if (model.claims!.IsRoleEditAndCreate)
                {
                    await claimsSerivce.CreateClaims(role, "role", "editcreate");
                }
                if (model.claims!.IsBookDelete)
                {
                    await claimsSerivce.CreateClaims(role, "role", "delete");
                }
            }


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
                role= await claimsSerivce.DeleteClaims(role);
                if (model.claims!.IsBookRead)
                {
                    await claimsSerivce.CreateClaims(role, "book", "view");
                }
                if (model.claims!.IsBookEditAndCreate)
                {
                    await claimsSerivce.CreateClaims(role, "book", "editcreate");
                }
                if (model.claims!.IsBookDelete)
                {
                    await claimsSerivce.CreateClaims(role, "book", "delete");
                }
                if (model.claims!.IsCategoryRead)
                {
                    await claimsSerivce.CreateClaims(role, "category", "view");
                }
                if (model.claims!.IsCategoryEditAndCreate)
                {
                    await claimsSerivce.CreateClaims(role, "category", "editcreate");
                }
                if (model.claims!.IsCategoryDelete)
                {
                    await claimsSerivce.CreateClaims(role, "category", "delete");
                }
                if (model.claims!.IsMemberRead)
                {
                    await claimsSerivce.CreateClaims(role, "member", "view");
                }
                if (model.claims!.IsMemberEditAndCreate)
                {
                    await claimsSerivce.CreateClaims(role, "member", "editcreate");
                }
                if (model.claims!.IsMemberDelete)
                {
                    await claimsSerivce.CreateClaims(role, "member", "delete");
                }
                if (model.claims!.IsStaffRead)
                {
                    await claimsSerivce.CreateClaims(role, "staff", "view");
                }
                if (model.claims!.IsStaffEditAndCreate)
                {
                    await claimsSerivce.CreateClaims(role, "staff", "editcreate");
                }
                if (model.claims!.IsStaffDelete)
                {
                    await claimsSerivce.CreateClaims(role, "staff", "delete");
                }
                if (model.claims!.IsBorrowBookRead)
                {
                    await claimsSerivce.CreateClaims(role, "borrow", "view");
                }
                if (model.claims!.IsBorrowBookCreateAndEdit)
                {
                    await claimsSerivce.CreateClaims(role, "borrow", "editcreate");
                }
                if (model.claims!.IsImportBookCreate)
                {
                    await claimsSerivce.CreateClaims(role, "import", "editcreate");
                }
                if (model.claims!.IsImportBookRead)
                {
                    await claimsSerivce.CreateClaims(role, "import", "view");
                }
                if (model.claims!.IsBorrowBookRead)
                {
                    await claimsSerivce.CreateClaims(role, "income", "view");
                }
                if (model.claims!.IsRoleRead)
                {
                    await claimsSerivce.CreateClaims(role, "role", "view");
                }
                if (model.claims!.IsRoleEditAndCreate)
                {
                    await claimsSerivce.CreateClaims(role, "role", "editcreate");
                }
                if (model.claims!.IsBookDelete)
                {
                    await claimsSerivce.CreateClaims(role, "role", "delete");
                }

                await roleManager.UpdateAsync(role);
            }
        }
        public async Task<RoleDetailDTO> GetRole(string Id)
        {
            var role = await roleManager.FindByIdAsync(Id);
            
            if (role==null)
            {
                return null;
            }
            var existingClaims = await roleManager.GetClaimsAsync(role);
            return new RoleDetailDTO
            {
                Id = role.Id,
                Name = role.Name,
                claims = new ClaimsModel
                {
                    IsBookRead=existingClaims.Any(ex=>ex.Type=="book"&&ex.Value=="view"),
                    IsBookEditAndCreate=existingClaims.Any(ex=>ex.Type=="book"&&ex.Value=="editcreate"),
                    IsBookDelete=existingClaims.Any(ex=>ex.Type=="book"&&ex.Value=="delete"),
                    IsCategoryRead = existingClaims.Any(ex => ex.Type == "category" && ex.Value == "view"),
                    IsCategoryEditAndCreate = existingClaims.Any(ex => ex.Type == "category" && ex.Value == "editcreate"),
                    IsCategoryDelete = existingClaims.Any(ex => ex.Type == "category" && ex.Value == "delete"),
                    IsMemberRead = existingClaims.Any(ex => ex.Type == "member" && ex.Value == "view"),
                    IsMemberEditAndCreate = existingClaims.Any(ex => ex.Type == "member" && ex.Value == "editcreate"),
                    IsMemberDelete = existingClaims.Any(ex => ex.Type == "member" && ex.Value == "delete"),
                    IsStaffRead = existingClaims.Any(ex => ex.Type == "staff" && ex.Value == "view"),
                    IsStaffEditAndCreate = existingClaims.Any(ex => ex.Type == "staff" && ex.Value == "editcreate"),
                    IsStaffDelete = existingClaims.Any(ex => ex.Type == "staff" && ex.Value == "delete"),
                    IsBorrowBookRead = existingClaims.Any(ex => ex.Type == "borrow" && ex.Value == "view"),
                    IsBorrowBookCreateAndEdit = existingClaims.Any(ex => ex.Type == "borrow" && ex.Value == "editcreate"),
                    IsIncomeRead=existingClaims.Any(ex=>ex.Type=="income"&&ex.Value=="view"),
                    IsImportBookRead=existingClaims.Any(ex=>ex.Type=="import"&&ex.Value=="view"),
                    IsImportBookCreate = existingClaims.Any(ex => ex.Type == "import" && ex.Value == "editcreate"),
                    IsRoleRead= existingClaims.Any(ex => ex.Type == "role" && ex.Value == "view"),
                    IsRoleDelete= existingClaims.Any(ex => ex.Type == "role" && ex.Value == "delete"),
                    IsRoleEditAndCreate= existingClaims.Any(ex => ex.Type == "role" && ex.Value == "editcreate"),

                }
                
            };

        }
    }
}
