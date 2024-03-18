
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;

namespace ManagerLibrary.Repository.CategoryReponsitory
{
    public interface ICategoryReponsitory
    {
        Task<int> CreateCategory(CategoryModel model);
        Task UpdateCategory(int id,CategoryModel model);
        Task DeleteCategory(int id);
        Task<DTOCategory> GetCategory(int id);
        Task<List<DTOCategory>> GetAllCategories();

    }
}
