namespace ManagerLibrary.Models
{
    public class ChangePasswordModel
    {
        public string PasswordPresent { get; set; }=string.Empty;
        public string NewPassword { get; set; }=string.Empty;
        public string ConfirmPassword { get; set;}=string.Empty;
    }
}
