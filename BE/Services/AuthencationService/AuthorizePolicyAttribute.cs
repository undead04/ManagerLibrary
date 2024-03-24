using Microsoft.AspNetCore.Authorization;
using System.Reflection;

namespace ManagerLibrary.Services.AuthencationService
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizePolicyAttribute : Attribute
    {
        public string PolicyName { get; }

        public AuthorizePolicyAttribute(string policyName)
        {
            PolicyName = policyName;
        }
    }

    public static class AuthorizationPolicyExtensions
    {
        public static IServiceCollection AddPolicyFromAttributes(this IServiceCollection services, Assembly assembly)
        {
            services.AddAuthorization(options =>
            {
                var typesWithAuthorizeAttributes = assembly.GetTypes()
                    .SelectMany(t => t.GetMethods())
                    .Where(m => m.GetCustomAttributes(typeof(AuthorizePolicyAttribute), true).Length > 0);

                foreach (var method in typesWithAuthorizeAttributes)
                {
                    var attributes = method.GetCustomAttributes(typeof(AuthorizePolicyAttribute), true);
                    foreach (AuthorizePolicyAttribute attribute in attributes)
                    {
                        options.AddPolicy(attribute.PolicyName, policy =>
                        {
                            policy.RequireAuthenticatedUser(); // Yêu cầu người dùng đã xác thực
                            policy.RequireClaim(attribute.PolicyName); // Yêu cầu claim có tên tương ứng với tên policy
                        });
                    }
                }
            });

            return services;
        }
    }
    }
