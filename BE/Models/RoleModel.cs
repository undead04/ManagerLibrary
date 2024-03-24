namespace ManagerLibrary.Models
{
    public class RoleModel
    {
        public string Name { get; set; } = string.Empty;
        public ClaimsModel? claims { get; set; }
    }
}
