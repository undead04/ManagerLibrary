using ManagerLibrary.Model;
using ManagerLibrary.Models;
using ManagerLibrary.Models.DTO;
using ManagerLibraryAPI.Repository.ImportBookReponsitory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagerLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportBookController : ControllerBase
    {
        private readonly IImportBookReponsitory importBookRepository;

        public ImportBookController(IImportBookReponsitory importBookReponsitory)
        {
            this.importBookRepository=importBookReponsitory;
        }
        [HttpPost]
        [Authorize(Policy = "ImportEditCreate")]
        public async Task<IActionResult> CreateImportBook(ImportBookMode model)
        {
            try
            {
                await importBookRepository.CreateImportBook(model);
                return Ok(Repository<string>.WithMessage("tạo hóa đơn thành công", 200));

            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Authorize(Policy = "ImportView")]
        public async Task<IActionResult> GetAllImportBook(string? staffId)
        {
            try
            {
                var importBook= await importBookRepository.GetAllImportBook(staffId);
                return Ok(Repository<List<DTOImportBook>>.WithData(importBook, 200));

            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{Id}")]
        [Authorize(Policy = "ImportView")]
        public async Task<IActionResult> GetImportBookDetail(int Id)
        {
            try
            {
                var importBookDetail = await importBookRepository.GetImportBookDetail(Id);
                if(importBookDetail==null)
                {
                    return NotFound();
                }
                return Ok(Repository<List<DTOImportBookDetail>>.WithData(importBookDetail, 200));

            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
