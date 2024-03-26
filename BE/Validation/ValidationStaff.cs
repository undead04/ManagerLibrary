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
            RuleFor(x => x.UserName)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Không được trống")
                .Must(IsUserNameSpace).WithMessage("Tên người dùng không để có khoảng cách")
                .Custom((name, context) =>
                {
                    var model = (ValidationStaffModel)context.InstanceToValidate;

                    if (!IsNameUnchanged(model) && !IsNameUneque(name))
                    {
                        context.AddFailure("Tên bị trùng");
                    }
                });
            RuleFor(x => x.Email)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Không được trống")
                .EmailAddress().WithMessage("Không đúng định dạng email")
                .Custom((email, context) =>
                {
                    var model = (ValidationStaffModel)context.InstanceToValidate;

                    if (!IsEmailUnchanged(model) && !IsEmailUneque(email))
                    {
                        context.AddFailure("Email bị trùng");
                    }
                });
            RuleFor(x => x.Phone)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Không được trống")
                .Custom((phone, context) =>
                {
                    var model = (ValidationStaffModel)context.InstanceToValidate;

                    if (!IsPhoneUnchanged(model) && !IsPhoneUneque(phone))
                    {
                        context.AddFailure("Số điện thoại bị trùng");
                    }
                });
            RuleFor(x => x.Address).NotEmpty().WithMessage("Không được trống");
            
            RuleFor(x => x.RoleId).NotEmpty().WithMessage("Không được trống");
            RuleFor(x => x.Password).Cascade(CascadeMode.Stop)
                .Custom((password, context) =>
                {
                    var model = (ValidationStaffModel)context.InstanceToValidate;

                    if (IsEmpty(model))
                    {
                        context.AddFailure("Không được trống");
                    }

                })
                 .Custom((password, context) =>
                 {
                     var model = (ValidationStaffModel)context.InstanceToValidate;

                     if (LengthPassword(model))
                     {
                         context.AddFailure("Mật khẩu phải có đủ 8 ký tự trở lên");
                     }
                     
                 });
            RuleFor(x => x.Gender).NotNull().WithMessage("Không được để trống");

        }
        private bool IsEmpty(ValidationStaffModel model)
        {
           
                if(string.IsNullOrEmpty(model.UserId))
                {
                    if(string.IsNullOrEmpty(model.Password))
                    {
                        return true;
                    }
                }
                return false;
            
        }
        private bool LengthPassword(ValidationStaffModel UserModel)
        {
            if(String.IsNullOrEmpty(UserModel.UserId))
            {
                if (UserModel.Password.Length < 8)
                {
                    return true;
                }
                
            }
            return false;
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
        private bool IsUserNameSpace(string name)
        {
            foreach(char kt in name)
            {
                if (char.IsWhiteSpace(kt))
                {
                    return false;
                }
            }
            return true;
        }
    }
}
