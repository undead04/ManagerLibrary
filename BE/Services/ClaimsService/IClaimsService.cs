using Microsoft.AspNetCore.Identity;

namespace ManagerLibrary.Services.ClaimsService
{
    public interface IClaimsService
    {
        Task CreateClaims(IdentityRole role,string claimsType, string claimsValue);
        Task<IdentityRole> DeleteClaims(IdentityRole role);
    }
}
