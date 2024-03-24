
using ManagerLibrary.Data;
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Services.UpLoadService;
using Microsoft.EntityFrameworkCore;

namespace ManagerLibrary.Repository.MemberReposnitory
{
    public class MemberReponsitory : IMemberReponsitory
    {
        private readonly MyDb context;
        private readonly IUploadService uploadService;

        public MemberReponsitory(MyDb context,IUploadService uploadService) 
        {
            this.context = context;
            this.uploadService=uploadService;
        }
        public async Task<int> CreateMember(MemberModel model)
        {
            
            var member = new Members
            {
                Name = model.Name,
                Gender = model.Gender,
                Phone = model.Phone,
                Address = model.Address,
                
            };
            await context.members.AddAsync(member);
            await context.SaveChangesAsync();
            if(model.Avatar!= null)
            {
                if(model.Avatar.Length > 0)
                {
                    string newImage= await uploadService.UploadImage(member.Id, "Avatar", model.Avatar);
                    member.Avatar = newImage;
                    await context.SaveChangesAsync();
                }
            }
            return member.Id;
        }

        public async Task DeleteMember(int id)
        {
            var memeber = await context.members.FirstOrDefaultAsync(me => me.Id == id);
            if(memeber!=null)
            {
                uploadService.DeleteImage("Avatar", memeber.Avatar);
                context.Remove(memeber);
                await context.SaveChangesAsync();
                
            }
        }

        public async Task<List<DTOMember>> GetAllMember(string? search)
        {

            var member =  context.members.AsQueryable();
            if(!String.IsNullOrEmpty(search))
            {
                member=member.Where(me=>me.Name.Contains(search)||me.Phone.Contains(search));
            }
            return await member.Select(me => new DTOMember
            {
                Id = me.Id,
                Name = me.Name,
                Phone = me.Phone,
                Address = me.Address,
                Avatar = me.Avatar,
                Gender = me.Gender,
                UrlImage = uploadService.GetUrlImage("Avatar",me.Avatar)
            }).ToListAsync();
        }

        public async Task<DTOMember> GetMember(int id)
        {
            var member = await context.members.FirstOrDefaultAsync(me => me.Id == id);
            if (member == null)
            {
                return null;
            }
            return new DTOMember
            {
                Id = member.Id,
                Name = member.Name,
                Phone = member.Phone,
                Address = member.Address,
                Gender = member.Gender,
                Avatar = member.Avatar,
                UrlImage=uploadService.GetUrlImage("Avatar", member.Avatar)
            };
        }

        public async Task UpdateMember(int id, MemberModel model)
        {
            var member = await context.members.FirstOrDefaultAsync(me => me.Id == id);
            if (member != null)
            {
                member.Name = model.Name;
                member.Address = model.Address;
                member.Gender = model.Gender;
                member.Phone = model.Phone;
                if(model.Avatar!=null)
                {
                    if (model.Avatar.Length > 0)
                    {
                        uploadService.DeleteImage("Avatar", member.Avatar);
                        string newImage = await uploadService.UploadImage(member.Id, "Avatar", model.Avatar);
                        member.Avatar = newImage;
                        await context.SaveChangesAsync();
                    }
                }
                await context.SaveChangesAsync();

            }
            
        }
    }
}
