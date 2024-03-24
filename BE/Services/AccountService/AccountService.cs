using ManagerLibrary.Data;
using ManagerLibrary.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ManagerLibrary.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;

        public AccountService(UserManager<ApplicationUser> userManager,IConfiguration configuration,RoleManager<IdentityRole> roleManager) 
        { 
            this.userManager=userManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
        }
        public async Task<string> CreateToken(SignInModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,model.Email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                
               

            };
            var userRoles = await userManager.GetRolesAsync(user);
            var role = userRoles.FirstOrDefault();
            if(role!= null)
            {
                var roleObject = await roleManager.FindByNameAsync(role);
                authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
                if(roleObject!=null)
                {
                    var claimsUser = await roleManager.GetClaimsAsync(roleObject);
                    foreach(var claim in claimsUser)
                    {
                        authClaims.Add(new Claim(claim.Type, claim.Value));
                    }
                }
            }
            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(50),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha256Signature));
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string> SignIn(SignInModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if(user == null)
            {
                return null;
            }
            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordValid)
            {
                return null;
            }
            return await CreateToken(model);
        }
    }
}
