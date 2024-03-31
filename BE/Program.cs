using FluentValidation.AspNetCore;
using ManagerLibrary.Data;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.BookReponsitory;
using ManagerLibrary.Repository.BookTransactionReponsitory;
using ManagerLibrary.Repository.CategoryReponsitory;
using ManagerLibrary.Repository.MemberReposnitory;
using ManagerLibrary.Repository.PasswordRepository;
using ManagerLibrary.Repository.Role;
using ManagerLibrary.Repository.RoleRepository;
using ManagerLibrary.Repository.StaffReponsitory;
using ManagerLibrary.Services.AccountService;
using ManagerLibrary.Services.AuthencationService;
using ManagerLibrary.Services.ClaimsService;
using ManagerLibrary.Services.ReadJWTService;
using ManagerLibrary.Services.StatisticalService;
using ManagerLibrary.Services.UpLoadService;
using ManagerLibraryAPI.Repository.ImportBookReponsitory;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
                .AddFluentValidation(options =>
                {
                    // Validate child properties and root collection elements
                    options.ImplicitlyValidateChildProperties = true;
                    options.ImplicitlyValidateRootCollectionElements = true;

                    // Automatic registration of validators in assembly
                    options.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
                });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
    });

    option.OperationFilter<SecurityRequirementsOperationFilter>();
});
//setup ApplicationsUser
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(option =>
{
    option.User.RequireUniqueEmail = true;
    option.Password.RequiredLength = 8;
    option.Password.RequireLowercase = false;
    option.Password.RequireUppercase = false;
    option.Password.RequireNonAlphanumeric = false;
    option.Password.RequireDigit = false;
    option.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@ầằềềờớừửừữặẫẳếềẹễếựửồổõờớồộổỏơớọỏờớườừốửồụủưứứỷỳỹ";

}).AddEntityFrameworkStores<MyDb>();


builder.Services.AddDbContext<MyDb>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("MyDB")));
//authencation
builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(option =>
{
    option.SaveToken = true;
    option.RequireHttpsMetadata = false;
    option.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration["JWT:Secret"]))
    };
});
// add cors
builder.Services.AddCors(option =>
{
    option.AddPolicy("test",builder =>
    {
        builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});
// tắt tính năng auto validation
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
// phân quyền
var policyConfigurations = new List<PolicyConfiguration>
        {
            new PolicyConfiguration { PolicyName = "BookView", ClaimType = "book", ClaimValue = "view" },
            new PolicyConfiguration { PolicyName = "BookEditCreate", ClaimType = "book", ClaimValue = "editcreate" },
            new PolicyConfiguration { PolicyName = "BookDelete", ClaimType = "book", ClaimValue = "delete" },
            new PolicyConfiguration { PolicyName = "MemberView", ClaimType = "member", ClaimValue = "view" },
            new PolicyConfiguration { PolicyName = "MemberEditCreate", ClaimType = "member", ClaimValue = "editcreate" },
            new PolicyConfiguration { PolicyName = "MemberDelete", ClaimType = "member", ClaimValue = "delete" },
            new PolicyConfiguration { PolicyName = "CategoryView", ClaimType = "category", ClaimValue = "view" },
            new PolicyConfiguration { PolicyName = "CategoryEditCreate", ClaimType = "category", ClaimValue = "editcreate" },
            new PolicyConfiguration { PolicyName = "CategoryDelete", ClaimType = "category", ClaimValue = "delete" },
            new PolicyConfiguration { PolicyName = "StaffView", ClaimType = "staff", ClaimValue = "view" },
            new PolicyConfiguration { PolicyName = "StaffEditCreate", ClaimType = "staff", ClaimValue = "editcreate" },
            new PolicyConfiguration { PolicyName = "StaffDelete", ClaimType = "staff", ClaimValue = "delete" },
            new PolicyConfiguration { PolicyName = "BorrowView", ClaimType = "borrow", ClaimValue = "view" },
            new PolicyConfiguration { PolicyName = "BorrowEditCreate", ClaimType = "borrow", ClaimValue = "editcreate" },
            new PolicyConfiguration { PolicyName = "ImportView", ClaimType = "import", ClaimValue = "view" },
            new PolicyConfiguration { PolicyName = "ImportEditCreate", ClaimType = "import", ClaimValue = "editcreate" },
            new PolicyConfiguration { PolicyName = "IncomeView", ClaimType = "income", ClaimValue = "view" },
            new PolicyConfiguration { PolicyName = "RoleView", ClaimType = "roless", ClaimValue = "view" },
            new PolicyConfiguration { PolicyName = "RoleEditCreate", ClaimType = "roless", ClaimValue = "editcreate" },
            new PolicyConfiguration { PolicyName = "RoleDelete", ClaimType = "roless", ClaimValue = "delete" },
           

            // Add more policy configurations as needed
        };

// Add authorization policies dynamically based on the configurations
foreach (var policyConfig in policyConfigurations)
{
    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy(policyConfig.PolicyName, policy =>
        {
            policy.RequireClaim(policyConfig.ClaimType, policyConfig.ClaimValue);
        });
    });
}
builder.Services.AddScoped<ICategoryReponsitory, CategoryRepository>();
builder.Services.AddScoped<IBookReponsitory, BookReponsitory>();
builder.Services.AddScoped<IMemberReponsitory, MemberReponsitory>();
builder.Services.AddScoped<IImportBookReponsitory, ImportBookReponsitory>();
builder.Services.AddScoped<IBookTransactionReponsitory, BookTransactionReponsitory>();
builder.Services.AddScoped<IPasswordRepository, PasswordRepository>();
builder.Services.AddScoped<IUploadService, UploadService>();
builder.Services.AddScoped<IStaffReposnitory, StaffReponsitory>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IStatisticalServer,StatisticalServer>();
builder.Services.AddScoped<IClaimsService, ClaimsService>();
builder.Services.AddScoped<IReadJWTService, ReadJWTService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();
app.UseCors("test");
app.MapControllers();

app.Run();
