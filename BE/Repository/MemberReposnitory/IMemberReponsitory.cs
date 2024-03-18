
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;

namespace ManagerLibrary.Repository.MemberReposnitory
{
    public interface IMemberReponsitory
    {
        Task CreateMember(MemberModel model);
        Task UpdateMember(int id,MemberModel model);
        Task DeleteMember(int id);
        Task<DTOMember> GetMember(int id);
        Task<List<DTOMember>> GetAllMember();
    }
}
