using FluentValidation;
using ManagerLibrary.Data;

namespace ManagerLibrary.Validation
{
    public class ValidationBookModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public int PublishedYear { get; set; }
        public decimal Price { get; set; }
        public IFormFile? Image { get; set; }
        public int CategoryId { get; set; }
    }
    public class ValidationBook:AbstractValidator<ValidationBookModel>
    {
        private readonly MyDb context;

        public ValidationBook(MyDb context)
        {
            this.context=context;
            RuleFor(x => x.Title).NotEmpty().WithMessage("Không được để trống");
            RuleFor(x => x.Author).NotEmpty().WithMessage("Không được để trống");
            RuleFor(x=>x.ISBN).Cascade(CascadeMode.Stop).NotEmpty().WithMessage("Không được để trống")
                 .Custom((isbn, context) =>
                 {
                     var model = (ValidationBookModel)context.InstanceToValidate;

                     if (!IsCodeUnchanged(model) && !IsCodeUneque(isbn))
                     {
                         context.AddFailure("Mã sách bị trùng");
                     }
                 });
            RuleFor(x => x.PublishedYear).NotEmpty().WithMessage("Không được để trống");
            RuleFor(x => x.CategoryId).NotEmpty().WithMessage("Không được để trống");
            
        }
       
        private bool IsCodeUnchanged(ValidationBookModel bookModel)
        {
            var book = context.books.FirstOrDefault(bo => bo.Id == bookModel.Id);
            if (book != null)
            {
                return book.ISBN == bookModel.ISBN;
            }
            return false;

        }
        private bool IsCodeUneque(string isbn)
        {
            var book = context.books.Select(x => x.ISBN).ToList().Contains(isbn);
            return !book;
        }
    }
}
