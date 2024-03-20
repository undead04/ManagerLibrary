using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace ManagerLibrary.Services.AuthencationService
{
    public class DynamicAuthorizationPolicyProvider : DefaultAuthorizationPolicyProvider
    {
        public DynamicAuthorizationPolicyProvider(IOptions<AuthorizationOptions> options)
            : base(options)
        {
        }

        public override Task<AuthorizationPolicy> GetPolicyAsync(string policyName)
        {
            if (policyName.StartsWith("ManageBooksPolicy"))
            {
                // Lấy tên chức năng từ policyName
                var functionName = policyName.Substring("ManageBooksPolicy".Length);

                // Tạo policy yêu cầu claim tương ứng với chức năng quản lý sách
                var policy = new AuthorizationPolicyBuilder()
                    .RequireClaim("ManageBooks", functionName)
                    .Build();

                return Task.FromResult(policy);
            }
            else if (policyName.StartsWith("ManageCategoriesPolicy"))
            {
                // Lấy tên chức năng từ policyName
                var functionName = policyName.Substring("ManageCategoriesPolicy".Length);

                // Tạo policy yêu cầu claim tương ứng với chức năng quản lý danh mục
                var policy = new AuthorizationPolicyBuilder()
                    .RequireClaim("ManageCategories", functionName)
                    .Build();

                return Task.FromResult(policy);
            }

            return base.GetPolicyAsync(policyName);
        }
    }

}
