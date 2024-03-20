namespace ManagerLibrary.Model
{
    public class MemberModel
    {
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public IFormFile? Avatar { get; set; }
        public string Address { get; set; } = string.Empty;
        public bool Gender { get; set; }
    }
}
