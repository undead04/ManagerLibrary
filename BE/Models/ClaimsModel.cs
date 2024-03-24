namespace ManagerLibrary.Models
{
    public class ClaimsModel
    {
        public bool IsBookRead { get; set; }
        public bool IsBookEditAndCreate { get; set; }
        public bool IsBookDelete { get; set; }
        public bool IsStaffRead { get; set; }
        public bool IsStaffDelete { get; set; }
        public bool IsStaffEditAndCreate { get; set; }
        public bool IsMemberRead { get; set; }
        public bool IsMemberDelete { get; set; }
        public bool IsMemberEditAndCreate { get; set; }
        public bool IsCategoryRead { get; set; }
        public bool IsCategoryEditAndCreate { get; set; }
        public bool IsCategoryDelete { get; set; }
        public bool IsBorrowBookRead { get; set; }
        public bool IsBorrowBookCreateAndEdit { get; set; }
        public bool IsImportBookRead { get; set; }
        public bool IsImportBookCreate { get; set; }
        public bool IsIncomeRead { get; set; }
    }
}
