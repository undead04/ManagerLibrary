﻿using ManagerLibrary.Data;
using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using ManagerLibrary.Repository.PasswordRepository;
using ManagerLibrary.Services.ReadJWTService;
using ManagerLibrary.Services.UpLoadService;
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
        private readonly IUploadService uploadService;
        private readonly IReadJWTService readJWTService;

        public StaffReponsitory(MyDb context,UserManager<ApplicationUser> userManager,RoleManager<IdentityRole> roleManager,
            IPasswordRepository passwordRepository,IUploadService uploadService,IReadJWTService readJWTService)
        {
            this.context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.passwordRepository=passwordRepository;
            this.uploadService = uploadService;
            this.readJWTService=readJWTService;
        }
        public async Task<string> CreateStaff(StaffModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                Address = model.Address,
                Gender = model.Gender,
                Phone = model.Phone,
               
            };
            var result = await userManager.CreateAsync(user,model.Password);
            var role = await roleManager.FindByIdAsync(model.RoleId);
            if (result.Succeeded)
            {
                if (!await roleManager.RoleExistsAsync(role.Name))
                {
                    await roleManager.CreateAsync(new IdentityRole(role.Name));
                }
                await userManager.AddToRoleAsync(user,role.Name);

            }
            if(model.Avatar!=null)
            {
                if(model.Avatar.Length>0)
                {
                    string avatar= await uploadService.UploadImage<string>(user.Id, "Avatar", model.Avatar);
                    user.Avatar = avatar;
                    await userManager.UpdateAsync(user);
                }
               
            }
            return user.Id;
        }

        public async Task DeleteStaff(string Id)
        {
            var user = await userManager.FindByIdAsync(Id);
            if (user != null) 
            {
               await userManager.DeleteAsync(user);
            }
            
        }

        public async Task<List<DTOStaff>> GetAllStaff(string?search,string?roleId)
        {
            var users =await userManager.Users.ToListAsync();
            if (!string.IsNullOrEmpty(search))
            {
                users = users.Where(us => us.UserName!.Contains(search) || us.Email!.Contains(search)).ToList();
            }
            if(!string.IsNullOrEmpty(roleId))
            {
                var role = await roleManager.FindByIdAsync(roleId);
                if (role != null)
                {
                    var userRole = await userManager.GetUsersInRoleAsync(role.Name!);
                    users = userRole.ToList();
                }
            }
            List<DTOStaff> listStaff = new List<DTOStaff>();
            foreach(var user in users)
            {
                var roles = await userManager.GetRolesAsync(user);
                var roleIds = await roleManager.FindByNameAsync(String.Join("", roles));
                if(user!=null&&roleIds!=null)
                {
                    var dtoStaff = new DTOStaff
                    {
                        Id = user.Id,
                        RoleId = roleIds.Id,
                        UserName = user.UserName!,
                        Email = user.Email!,
                        Avatar = user.Avatar,
                        Phone = user.Phone,
                        Address = user.Address,
                        Gender = user.Gender,
                        Role = String.Join("", roles),
                        UrlAvatar = uploadService.GetUrlImage("Avatar", user.Avatar),
                    };
                    listStaff.Add(dtoStaff);
                }
              
            }
            return listStaff;
            

            
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
                    UrlAvatar = uploadService.GetUrlImage("Avatar",user.Avatar),

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
                if (model.Avatar != null)
                {
                    if (model.Avatar.Length > 0)
                    {
                        uploadService.DeleteImage("Avatar", user.Avatar);
                       string avatar= await uploadService.UploadImage<string>(user.Id, "Avatar", model.Avatar);
                        user.Avatar = avatar;
                    }

                }
                await userManager.UpdateAsync(user);
            }
        }
        public async  Task<DTOStaff> GetStaffToken()
        {
            var useid = await readJWTService.ReadJWT();
            return await GetStaff(useid);
        }
    }
}
