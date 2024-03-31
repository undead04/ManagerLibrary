using ManagerLibrary.Model;

namespace ManagerLibrary.Model.DTO
{
    public class DTOBookTranstion
    {
        public int Id { get; set; }
        public string StaffId { get; set; } = string.Empty;
        public string NameStaff { get; set; }= string.Empty;
        public string NameMember { get; set; }=string.Empty;
        public int MemebrId { get; set; }
        public string BallotType { get; set; } = string.Empty;
        public DateTime Create_At { get; set; }
       
       
    }
}
