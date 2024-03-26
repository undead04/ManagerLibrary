using FluentValidation;
using ManagerLibrary.Data;
using ManagerLibrary.Model;
using ManagerLibrary.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Principal;

namespace ManagerLibrary.Validation
{
    public class ValidationRoleModel:RoleModel
    {
        public string Id { get; set; } = string.Empty;
        
    }
    public class ValidationRole:AbstractValidator<ValidationRoleModel>
    {
        public readonly RoleManager<IdentityRole> roleManager;

        public ValidationRole(RoleManager<IdentityRole> roleManager) 
        {
            this.roleManager = roleManager;
            RuleFor(x => x.Name).NotEmpty().WithMessage("Không được trống")
                 .Custom((name, context) =>
                 {
                     var model = (ValidationRoleModel)context.InstanceToValidate;

                     if (!IsNameUnchanged(model) && !IsNameUneque(name))
                     {
                         context.AddFailure("Tên bị trùng");
                     }
                 });
           
           
        }
        private bool IsNameUnchanged(ValidationRoleModel model)
        {
            var role = roleManager.FindByIdAsync(model.Id).Result;
            if (role!=null)
            {
                return role.Name == model.Name;
            }
            return false;

        }
        private bool IsNameUneque(string name)
        {
            var category = roleManager.RoleExistsAsync(name).Result;
            return !category;
        }
    }
   
}
