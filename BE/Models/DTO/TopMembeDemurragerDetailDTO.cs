using ManagerLibrary.Data;
using ManagerLibrary.Model.DTO;

namespace ManagerLibrary.Models.DTO
{
    public class TopMembeDemurragerDetailDTO
    {
        public string Name { get; set; } = string.Empty;
        public string UrlImage { get;set; } = string.Empty;
        public string Phone { get; set;} = string.Empty;
        public List<DTOBookTranstionDetail>? bookTranstionDetail { get; set; }

    }
}
