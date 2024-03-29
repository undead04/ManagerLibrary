﻿using ManagerLibrary.Model;
using ManagerLibrary.Models.DTO;

namespace ManagerLibraryAPI.Repository.ImportBookReponsitory
{
    public interface IImportBookReponsitory
    {
        Task CreateImportBook(ImportBookMode model);
        Task<List<DTOImportBook>> GetAllImportBook(string?staffId);
        Task<List<DTOImportBookDetail>> GetImportBookDetail(int Id);
       
    }
}
