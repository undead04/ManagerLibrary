
using ManagerLibrary.Data;
using ManagerLibrary.Model;
using ManagerLibrary.Model.DTO;
using Microsoft.EntityFrameworkCore;

namespace ManagerLibrary.Repository.CategoryReponsitory
{
    public class CategoryRepository : ICategoryReponsitory
    {
        private readonly MyDb context;

        public CategoryRepository(MyDb context) 
        {
            this.context = context;
        }
        public async Task<int> CreateCategory(CategoryModel model)
        {
            var category = new Category
            {
                Name = model.Name,
                Description = model.Description,
            };
            await context.categories.AddAsync(category);
            await context.SaveChangesAsync();
            return category.CategoryId;
        }

        public async Task DeleteCategory(int id)
        {
            var category = await context.categories.FirstOrDefaultAsync(e => e.CategoryId == id);
            if(category!=null)
            {
                context.categories.Remove(category);
                await context.SaveChangesAsync();
            }
        }

        public Task<List<DTOCategory>> GetAllCategories()
        {
          return context.categories.Select(ca=>new DTOCategory {CategoryId=ca.CategoryId,Name = ca.Name, Description = ca.Description }).ToListAsync();
        }

        public async Task<DTOCategory> GetCategory(int id)
        {
            var category = await context.categories.FirstOrDefaultAsync(ca => ca.CategoryId == id);
            if(category==null)
            {
                return null;
            }
            return new DTOCategory {CategoryId=category.CategoryId, Name = category.Name,Description = category.Description };
        }

        public async Task UpdateCategory(int id, CategoryModel model)
        {
            var category = await context.categories.FirstOrDefaultAsync(ca => ca.CategoryId == id);
            if (category != null)
            {
                category.Name = model.Name;
                category.Description = model.Description;
                await context.SaveChangesAsync();
            }
           
        }
    }
}
