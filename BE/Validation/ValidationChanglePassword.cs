using FluentValidation;
using ManagerLibrary.Data;
using ManagerLibrary.Models;
using ManagerLibrary.Services.ReadJWTService;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace ManagerLibrary.Validation
{
    public class ValidationChanglePassword:AbstractValidator<ChangePasswordModel>
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IReadJWTService readJWTService;

        public ValidationChanglePassword(UserManager<ApplicationUser> userManager, IReadJWTService readJWTService)
        {
            this.userManager = userManager;
            this.readJWTService = readJWTService;
            RuleFor(x => x.PasswordPresent).Cascade(CascadeMode.Stop).Must(IsPresentPassWord).WithMessage("Nhập không đúng mật khẩu")
                .NotEmpty().WithMessage("Không được trống");
            RuleFor(x => x.NewPassword).Cascade(CascadeMode.Stop).NotEmpty().WithMessage("Không được để trống")
               .Must(CheckLengthPasswor).WithMessage("Phải có 8 ký tự trở lên")
               .Custom((Password, context) =>
               {
                   var model = (ChangePasswordModel)context.InstanceToValidate;
                   if (!CheckPasswordComform(model))
                   {
                       context.AddFailure("PasswordComfrom không đúng");
                   }

               });

        }


        private bool CheckPasswordComform(ChangePasswordModel model)
        {
            return model.NewPassword == model.ConfirmPassword;
        }
        private bool IsPresentPassWord(string passWord)
        {
            var userid = readJWTService.ReadJWT().Result;
            var user = userManager.FindByIdAsync(userid).Result;
            if(user!=null)
            {
                var passwordValid = userManager.CheckPasswordAsync(user, passWord).Result;
                if (passwordValid)
                {
                    return true;
                }
            }
            return false;

        }
        private bool CheckLengthPasswor(string password)
        {

            return password.Length >= 8 ? true : false;
        }
        
        
    }
}

