namespace ManagerLibrary.Models
{
    public class StaffModel
    {
        public string UserName { get; set; } = string.Empty;
        public string RoleId { get; set; }=string.Empty;
        public string Email { get;set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public bool Gender { get; set; }
        public string Address { get; set; } = string.Empty;
    }
}
