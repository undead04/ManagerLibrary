using ManagerLibrary.Data;
using ManagerLibrary.Repository.BookReponsitory;
using ManagerLibrary.Repository.BookTransactionReponsitory;
using ManagerLibrary.Repository.CategoryReponsitory;
using ManagerLibrary.Repository.MemberReposnitory;
using ManagerLibrary.Repository.PasswordRepository;
using ManagerLibrary.Repository.Role;
using ManagerLibrary.Repository.RoleRepository;
using ManagerLibrary.Repository.StaffReponsitory;
using ManagerLibrary.Services.AccountService;
using ManagerLibrary.Services.StatisticalService;
using ManagerLibrary.Services.UpLoadService;
using ManagerLibraryAPI.Repository.ImportBookReponsitory;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
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
})
    .AddEntityFrameworkStores<MyDb>();
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
    option.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});
// tắt tính năng auto validation
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
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

app.MapControllers();

app.Run();
