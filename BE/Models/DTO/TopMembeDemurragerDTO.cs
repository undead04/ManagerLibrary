namespace ManagerLibrary.Models.DTO
{
    public class TopMembeDemurragerDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string UrlImage { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public bool Gender { get; set; }
        public int LateCount { get; set; }
    }
}
