namespace ManagerLibrary.Model.DTO
{
    public class DTOMember
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Avatar { get; set; }
        public string Address { get; set; } = string.Empty;
        public bool Gender { get; set; }
    }
}
