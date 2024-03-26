using ManagerLibrary.Data;
using ManagerLibrary.Models;
using ManagerLibrary.Services.ReadJWTService;
using Microsoft.AspNetCore.Identity;

namespace ManagerLibrary.Repository.PasswordRepository
{
    public class PasswordRepository : IPasswordRepository
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IReadJWTService readJWTService;
        private readonly SignInManager<ApplicationUser> signInManager;

        public PasswordRepository(UserManager<ApplicationUser> userManager,IReadJWTService readJWTService, SignInManager<ApplicationUser> signInManager) 
        { 
            this.userManager=userManager;
            this.readJWTService=readJWTService;
            this.signInManager = signInManager;
        }
        public string CreatePassword()
        {
            Random random = new Random();
            string password = "";
            for (int i = 1; i <= 8; i++)
            {
                switch (i)
                {
                    case 1:
                    case 2:
                        int number = random.Next(65, 91);
                        password += (char)number;
                        break;
                    case 3:
                    case 4:
                        password += (char)random.Next(97, 123);
                        break;
                    case 5:
                    case 6:
                        password += (char)random.Next(35, 39);
                        break;
                    case 7:
                    case 8:
                        password += random.Next(1, 10);
                        break;
                }
            }
            return password;
        }
        public async Task ChangePassword(ChangePasswordModel model)
        {
            var userid =await readJWTService.ReadJWT();
            var user = await userManager.FindByIdAsync(userid);
            bool isEqual = model.ConfirmPassword == model.NewPassword;
            if (isEqual&&user!=null)
            {
                await userManager.ChangePasswordAsync(user, model.PasswordPresent, model.NewPassword);
                await signInManager.RefreshSignInAsync(user);
            }
        }
    }
}

