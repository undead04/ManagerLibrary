using Microsoft.AspNetCore.Identity;

namespace ManagerLibrary.Data
{
    public class ApplicationUser:IdentityUser
    {
        public string Avatar { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public bool Gender { get; set; }
        public string Address { get; set; } = string.Empty;
        public ICollection<BookTransactions>? bookTransactions { get; set; }
        public ICollection<ImportReceipts>? importReceipts { get; set; }
    }
}
