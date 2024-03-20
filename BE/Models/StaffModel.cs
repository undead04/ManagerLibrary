namespace ManagerLibrary.Models
{
    public class StaffModel
    {
        public string UserName { get; set; } = string.Empty;
        public string RoleId { get; set; }=string.Empty;
        public string Email { get;set; } = string.Empty;
        public IFormFile? Avatar { get; set; }
        public string Phone { get; set; } = string.Empty;
        public bool Gender { get; set; }
        public string Address { get; set; } = string.Empty;
    }
}
