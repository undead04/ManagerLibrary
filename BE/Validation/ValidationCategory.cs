using FluentValidation;
using ManagerLibrary.Data;
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using Microsoft.EntityFrameworkCore;

namespace ManagerLibrary.Validation
{
    public class CategoryValidationModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
    public class ValidationCategory:AbstractValidator<CategoryValidationModel>
    {
        private readonly MyDb context;

        public ValidationCategory(MyDb context) 
        { 
            this.context=context;
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name không đc trống")
                 .Custom((name, context) =>
                 {
                     var model = (CategoryValidationModel)context.InstanceToValidate;

                     if (!IsNameUnchanged(model) && !IsNameUneque(name))
                     {
                         context.AddFailure("Name bị trùng");
                     }
                 });
            RuleFor(x => x.Description).NotEmpty().WithMessage("Không được trông");
        }
        private bool IsNameUnchanged(CategoryValidationModel categoryModel)
        {
            var category = context.categories.FirstOrDefault(bo => bo.CategoryId == categoryModel.Id);
            if (category != null)
            {
                return category.Name == categoryModel.Name;
            }
            return false;

        }
        private bool IsNameUneque(string name)
        {
            var category = context.categories.Select(x => x.Name).ToList().Contains(name);
            return !category;
        }
    }
}
