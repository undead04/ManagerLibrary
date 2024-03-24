using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace ManagerLibrary.Services.ClaimsService
{
    public class ClaimsService : IClaimsService
    {
        private readonly RoleManager<IdentityRole> roleManager;

        public ClaimsService(RoleManager<IdentityRole> roleManager) 
        {
            this.roleManager = roleManager;
        }
        public async Task CreateClaims(IdentityRole role,string claimsType, string claimsValue)
        {
            var claims=new Claim(claimsType,claimsValue);
            await roleManager.AddClaimAsync(role, claims);
        }

        public async Task DeleteClaims(IdentityRole role)
        {
            var existingClaims = await roleManager.GetClaimsAsync(role);
            foreach (var claim in existingClaims)
            {
                await roleManager.RemoveClaimAsync(role, claim);
            }
            await roleManager.UpdateAsync(role);
        }
    }
}
