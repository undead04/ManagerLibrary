﻿using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using ManagerLibrary.Models;
using ManagerLibrary.Repository.BookReponsitory;
using ManagerLibrary.Repository.CategoryReponsitory;
using ManagerLibrary.Validation;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IBookReponsitory bookRepository;

        public CategoryController(ICategoryReponsitory categoryReponsitory,ValidationCategory validations,IBookReponsitory bookReponsitory) 
        {
            this.categoryReponsitory = categoryReponsitory;
            this.validation = validations;
            this.bookRepository = bookReponsitory;
        }
        [HttpGet]
        [Authorize(Policy = "CategoryView")]
        public async Task<IActionResult> GetAllCategory(string?search)
        {
            try
            {

                var categorys= await categoryReponsitory.GetAllCategories(search);
                return Ok(Repository<List<DTOCategory>>.WithData(categorys, 200));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{Id}")]
        [Authorize(Policy = "CategoryView")]
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
        [Authorize(Policy = "CategoryDelete")]
        public async Task<IActionResult> DeleteCateogy(int Id)
        {
            try
            {

                var categorys = await categoryReponsitory.GetCategory(Id);
                if (categorys == null)
                {
                    return NotFound();
                }
                var books =await bookRepository.getAllBook(string.Empty, Id);
                if(books.Count>0)
                {
                    return BadRequest(Repository<string>.WithMessage("Thể loại này đã có sách không được xóa",400));
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
        [Authorize(Policy = "CategoryEditCreate")]
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

                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));

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
        [Authorize(Policy = "CategoryEditCreate")]
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

                    return BadRequest(Repository<Dictionary<string, string>>.WithMessage(response, 400));

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
