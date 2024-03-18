using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.CategoryReponsitory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryReponsitory categoryReponsitory;

        public CategoryController(ICategoryReponsitory categoryReponsitory) 
        {
            this.categoryReponsitory = categoryReponsitory;
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

                
                await categoryReponsitory.CreateCategory(model);
                return Ok(Repository<string>.WithMessage("Tạo thể loại thành công", 200));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
