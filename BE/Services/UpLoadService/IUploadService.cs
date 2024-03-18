namespace ManagerLibrary.Services.UpLoadService
{
    public interface IUploadService
    {
        Task<string> UploadImage(int id,string procode,IFormFile image);
        string GetFilePath(string ProCode);
        string GetUrlImage(string imageName);
        void DeleteImage(string ProCode,string nameImage);
    }
}
