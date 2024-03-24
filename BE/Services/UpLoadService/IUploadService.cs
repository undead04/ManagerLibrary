namespace ManagerLibrary.Services.UpLoadService
{
    public interface IUploadService
    {
        Task<string> UploadImage<T>(T? id,string procode,IFormFile image);
        string GetFilePath(string ProCode);
        string GetUrlImage(string Procode,string imageName);
        void DeleteImage(string ProCode,string nameImage);
    }
}
