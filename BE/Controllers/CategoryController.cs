using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.CategoryReponsitory;
using ManagerLibrary.Validation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryReponsitory categoryReponsitory;
        private readonly ValidationCategory validation;

        public CategoryController(ICategoryReponsitory categoryReponsitory,ValidationCategory validations) 
        {
            this.categoryReponsitory = categoryReponsitory;
            this.validation = validations;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCategory()
        {
            try
            {

                var categorys= await categoryReponsitory.GetAllCategories();
                return Ok(Repository<List<DTOCategory>>.WithData(categorys, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetCategory(int Id)
        {
            try
            {

                var category = await categoryReponsitory.GetCategory(Id);
                if(category==null)
                {
                    return NotFound();
                }
                return Ok(Repository<DTOCategory>.WithData(category, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteCateogy(int Id)
        {
            try
            {

                var categorys = await categoryReponsitory.GetCategory(Id);
                if (categorys == null)
                {
                    return NotFound();
                }
                
                await categoryReponsitory.DeleteCategory(Id);
                return Ok(Repository<string>.WithMessage("Xóa thể loại thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateCategory(int Id,CategoryModel model)
        {
            try
            {
                var validationValue = new CategoryValidationModel
                {
                    Id = Id,
                    Description = model.Description,
                    Name = model.Name,
                };
                var validationResult = validation.Validate(validationValue);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return Ok(Repository<Dictionary<string, string>>.WithMessage(response, 400));

                }
                var categorys = await categoryReponsitory.GetCategory(Id);
                if (categorys == null)
                {
                    return NotFound();
                }
                await categoryReponsitory.UpdateCategory(Id,model);
                return Ok(Repository<string>.WithMessage("Cập nhật thể loại thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CategoryModel model)
        {
            try
            {
                var validationValue = new CategoryValidationModel
                {
                    Id=0,
                    Description=model.Description,
                    Name=model.Name,
                };
                var validationResult=validation.Validate(validationValue);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return Ok(Repository<Dictionary<string, string>>.WithMessage(response, 400));

                }

                int id= await categoryReponsitory.CreateCategory(model);
                return Ok(Repository<int>.WithData(id, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
