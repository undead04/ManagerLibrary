using FluentValidation;
using ManagerLibrary.Data;
using ManagerLibrary.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ManagerLibrary.Validation
{
    public class ValidationStaffModel : StaffModel
    {
        public string UserId { get; set; } = string.Empty;
    }
    public class ValidationStaff:AbstractValidator<ValidationStaffModel>
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly MyDb context;

        public ValidationStaff(UserManager<ApplicationUser> userManager,MyDb context)
        {
            this.userManager = userManager;
            this.context = context;
            RuleFor(x => x.UserName).NotEmpty().WithMessage("Không được trống")
                .Custom((name, context) =>
                {
                    var model = (ValidationStaffModel)context.InstanceToValidate;

                    if (!IsNameUnchanged(model) && !IsNameUneque(name))
                    {
                        context.AddFailure("Tên bị trùng");
                    }
                });
            RuleFor(x => x.Email).NotEmpty().WithMessage("Không được trống")
                .Custom((email, context) =>
                {
                    var model = (ValidationStaffModel)context.InstanceToValidate;

                    if (!IsEmailUnchanged(model) && !IsEmailUneque(email))
                    {
                        context.AddFailure("Email bị trùng");
                    }
                });
            RuleFor(x => x.Phone).NotEmpty().WithMessage("Không được trống")
                .Custom((phone, context) =>
                {
                    var model = (ValidationStaffModel)context.InstanceToValidate;

                    if (!IsPhoneUnchanged(model) && !IsPhoneUneque(phone))
                    {
                        context.AddFailure("Số điện thoại bị trùng");
                    }
                });
            RuleFor(x => x.Address).NotEmpty().WithMessage("Không được trống");
            RuleFor(x => x.Gender).NotEmpty().WithMessage("Không được trống");
            RuleFor(x => x.RoleId).NotEmpty().WithMessage("Không được trống");

        }
        private bool IsNameUnchanged(ValidationStaffModel UserModel)
        {
            var user = userManager.FindByIdAsync(UserModel.UserId).Result;
            if (user != null)
            {
                return user.UserName == UserModel.UserName;
            }
            return false;

        }
        private bool IsNameUneque(string name)
        {
            var user = userManager.Users.Select(x => x.UserName).ToList().Contains(name);
            return !user;
        }
        private bool IsPhoneUnchanged(ValidationStaffModel UserModel)
        {
            var user = userManager.FindByIdAsync(UserModel.UserId).Result;
            if (user != null)
            {
                return user.Phone == UserModel.Phone;
            }
            return false;

        }
        private bool IsPhoneUneque(string name)
        {
            var user = context.Users.Select(x => x.Phone).ToList().Contains(name);
            return !user;
        }
        private bool IsEmailUnchanged(ValidationStaffModel UserModel)
        {
            var user = userManager.FindByIdAsync(UserModel.UserId).Result;
            if (user != null)
            {
                return user.Email == UserModel.Email;
            }
            return false;

        }
        private bool IsEmailUneque(string name)
        {
            var user = userManager.Users.Select(x => x.Email).ToList().Contains(name);
            return !user;
        }
    }
}
