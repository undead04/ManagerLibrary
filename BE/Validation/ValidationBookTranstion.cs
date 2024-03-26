using FluentValidation;
using ManagerLibrary.Data;
using ManagerLibrary.Model;
using ManagerLibrary.Repository.BookReponsitory;
using System.Data;

namespace ManagerLibrary.Validation
{
    
    public class ValidationBookTranstion:AbstractValidator<BookTranstionModel>
    {
        private readonly MyDb context;
        private readonly IBookReponsitory bookRepository;

        public ValidationBookTranstion(MyDb context,IBookReponsitory bookReponsitory)
        {
            this.context = context;
            this.bookRepository = bookReponsitory;
            RuleFor(x=>x.MemberId).NotEmpty().WithMessage("Không được trống")
                .Must(IsReturnBook).WithMessage("Không cho mượn sách vì đã có mượn mà chưa trả")
                ;
            RuleFor(x => x.TransitionBookDetail).
                Cascade(CascadeMode.Stop)
                .Custom((detail, context) =>
                {
                    var model = (BookTranstionModel)context.InstanceToValidate;
                    if (IsQuanlity(model))
                    {
                        context.AddFailure("Chỉ cho một quyển sách mượn 1 sách");
                    }
                })
                .Custom((detail, context) =>
                {
                    var model = (BookTranstionModel)context.InstanceToValidate;
                    if (IsPresentQuantity(model))
                    {
                        context.AddFailure("Trông kho đã hết sách");
                    }
                })
                .Custom((detail, context) =>
                {
                    var model = (BookTranstionModel)context.InstanceToValidate;
                    if (IsBook(model))
                    {
                        context.AddFailure("Không có quyển sách này");
                    }
                });
        }
        private bool IsPresentQuantity(BookTranstionModel model)
        {
            foreach(var item in model.TransitionBookDetail!)
            {
                var book = bookRepository.getBook(item.BookId).Result;
                if(book.PresentQuantity-1<0)
                {
                    return true;
                }
                
            }
            return false;
        }
        private bool IsReturnBook(int memberid)
        {
            var booktranstion = context.bookTransactions.Where(bo => bo.MembersId == memberid)
                .Where(bo => bo.bookTransactionDetails!.Any(bo => bo.ReturnDate == DateTime.MinValue)).ToList();
            if (booktranstion.Count>0)
            {
                return false;
            }
            return true;
        }
        private bool IsBook(BookTranstionModel model)
        {
            foreach (var item in model.TransitionBookDetail!)
            {
                var book = context.books.FirstOrDefault(bo => bo.Id == item.BookId);
                if(book != null)
                {
                    return false;
                }
            }
            return true;
        }
        

        
        private bool IsQuanlity(BookTranstionModel model)
        {
            foreach (var item in model.TransitionBookDetail!)
            {
                if(item.Quantity==1)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
