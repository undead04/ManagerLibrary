﻿using ManagerLibrary.Data;
using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Repository.PasswordRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ManagerLibrary.Repository.StaffReponsitory
{
    
    public class StaffReponsitory : IStaffReposnitory
    {
        private readonly MyDb context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IPasswordRepository passwordRepository;

        public StaffReponsitory(MyDb context,UserManager<ApplicationUser> userManager,RoleManager<IdentityRole> roleManager,
            IPasswordRepository passwordRepository)
        {
            this.context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.passwordRepository=passwordRepository;
        }
        public async Task<IdentityResult> CreateStaff(StaffModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                Address = model.Address,
                Gender = model.Gender,
                Phone = model.Phone,
               
            };
            var result = await userManager.CreateAsync(user, passwordRepository.CreatePassword());
            var role = await roleManager.FindByIdAsync(model.RoleId);
            if (result.Succeeded)
            {
                if (!await roleManager.RoleExistsAsync(role.Name))
                {
                    await roleManager.CreateAsync(new IdentityRole(role.Name));
                }
                await userManager.AddToRoleAsync(user,role.Name);



            }
            return result;
        }

        public async Task DeleteStaff(string Id)
        {
            var user = await userManager.FindByIdAsync(Id);
            if (user != null) 
            {
               await userManager.DeleteAsync(user);
            }
            
        }

        public async Task<List<DTOStaff>> GetAllStaff()
        {
            var users= await userManager.Users.ToListAsync();
            var tasks = users.Select(async us =>
            {
                var roles = await userManager.GetRolesAsync(us);
                var roleIds = await roleManager.FindByNameAsync(String.Join("", roles));

                return new DTOStaff
                {
                    Id = us.Id,
                    RoleId = roleIds.Id,
                    UserName = us.UserName,
                    Email = us.Email,
                    Avatar = us.Avatar,
                    Phone = us.Phone,
                    Address = us.Address,
                    Gender = us.Gender,
                    Role = String.Join("",roles),

                };
            }).ToList();

            await Task.WhenAll(tasks);

            var result = tasks.Select(task => task.Result).ToList();
            return result;
        }

        public async Task<DTOStaff> GetStaff(string Id)
        {
            var user =await userManager.FindByIdAsync(Id);
            if (user != null)
            {
                var roles = await userManager.GetRolesAsync(user);
                var roleIds = await roleManager.FindByNameAsync(String.Join("", roles));


                return new DTOStaff
                {
                    Id = user.Id,
                    RoleId = roleIds.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Avatar = user.Avatar,
                    Phone = user.Phone,
                    Address = user.Address,
                    Gender = user.Gender,
                    Role = String.Join("", roles),

                };
            }
            return null;
           
        }

        public async Task UpdateStaff(string Id, StaffModel model)
        {
            var user = await userManager.FindByIdAsync(Id);
            if (user != null)
            {
                user.UserName = model.UserName;
                user.Address = model.Address;
                user.Phone = model.Phone;
                user.Gender = model.Gender;
                user.Email = model.Email;
                await userManager.UpdateAsync(user);
            }
        }
    }
}