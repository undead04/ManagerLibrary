using FluentValidation;
using ManagerLibrary.Data;
using ManagerLibrary.Model;

namespace ManagerLibrary.Validation
{
    public class ValidationMemberModel:MemberModel
    {
        public int Id { get; set; } 
    }
    public class ValidationMember:AbstractValidator<ValidationMemberModel>
    {
        private readonly MyDb context;

        public ValidationMember(MyDb context) 
        {
            this.context = context;
            RuleFor(x=>x.Address).NotEmpty().WithMessage("Không được để trống");
            RuleFor(x => x.Name).NotEmpty().WithMessage("Không được để trống");
            RuleFor(x => x.Phone).NotEmpty().WithMessage("Không được để trống")
                .Custom((phone, context) =>
                {
                    var model = (ValidationMemberModel)context.InstanceToValidate;

                    if (!IsPhoneUnchanged(model) && !IsPhoneUneque(phone))
                    {
                        context.AddFailure("Số điện thoại không được trùng bị trùng");
                    }
                });
            RuleFor(x => x.Gender).NotEmpty().WithMessage("Không được để trống");
        }
        private bool IsPhoneUnchanged(ValidationMemberModel memberModel)
        {
            var member = context.members.FirstOrDefault(me => me.Id == memberModel.Id);
            if (member != null)
            {
                return member.Phone == memberModel.Phone;
            }
            return false;

        }
        private bool IsPhoneUneque(string phone)
        {
            var members = context.members.Select(x => x.Phone).ToList().Contains(phone);
            return !members;
        }
    }
}
