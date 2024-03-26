using ManagerLibrary.Data;
using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static Azure.Core.HttpHeader;

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
                expires: DateTime.Now.AddDays(7),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha256Signature));
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<DTOLogin> SignIn(SignInModel model)
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
            string token =await CreateToken(model);
            var listRole=await userManager.GetRolesAsync(user);
            var nameRole= string.Join(",", listRole);
            
           
             var role = await roleManager.FindByNameAsync(nameRole);
            
            
            var roleClaims = await roleManager.GetClaimsAsync(role!);
            return new DTOLogin
            {
                Token = token,
                Claims = new ClaimsModel
                {
                    IsBookRead=roleClaims.Any(ex=>ex.Type=="book"&&ex.Value=="view"),
                    IsBookEditAndCreate=roleClaims.Any(ex=>ex.Type=="book"&&ex.Value=="editcreate"),
                    IsBookDelete=roleClaims.Any(ex=>ex.Type=="book"&&ex.Value=="delete"),
                    IsCategoryRead = roleClaims.Any(ex => ex.Type == "category" && ex.Value == "view"),
                    IsCategoryEditAndCreate = roleClaims.Any(ex => ex.Type == "category" && ex.Value == "editcreate"),
                    IsCategoryDelete = roleClaims.Any(ex => ex.Type == "category" && ex.Value == "delete"),
                    IsMemberRead = roleClaims.Any(ex => ex.Type == "member" && ex.Value == "view"),
                    IsMemberEditAndCreate = roleClaims.Any(ex => ex.Type == "member" && ex.Value == "editcreate"),
                    IsMemberDelete = roleClaims.Any(ex => ex.Type == "member" && ex.Value == "delete"),
                    IsStaffRead = roleClaims.Any(ex => ex.Type == "staff" && ex.Value == "view"),
                    IsStaffEditAndCreate = roleClaims.Any(ex => ex.Type == "staff" && ex.Value == "editcreate"),
                    IsStaffDelete = roleClaims.Any(ex => ex.Type == "staff" && ex.Value == "delete"),
                    IsBorrowBookRead = roleClaims.Any(ex => ex.Type == "borrow" && ex.Value == "view"),
                    IsBorrowBookCreateAndEdit = roleClaims.Any(ex => ex.Type == "borrow" && ex.Value == "editcreate"),
                    IsIncomeRead=roleClaims.Any(ex=>ex.Type=="income"&&ex.Value=="view"),
                    IsImportBookRead=roleClaims.Any(ex=>ex.Type=="import"&&ex.Value=="view"),
                    IsImportBookCreate = roleClaims.Any(ex => ex.Type == "import" && ex.Value == "editcreate"),

                }
            };
        }
    }
}
