namespace ManagerLibrary.Models.DTO
{
    public class DTOLogin
    {
        public string Token { get; set; }=string.Empty;
        public ClaimsModel? Claims { get; set; }
    }
}
