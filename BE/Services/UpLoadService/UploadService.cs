using ManagerLibrary.Data;

namespace ManagerLibrary.Services.UpLoadService
{
    public class UploadService : IUploadService
    {
        private readonly IWebHostEnvironment environment;

        public UploadService(IWebHostEnvironment environment) 
        { 
            this.environment=environment;
        }

        public string GetFilePath(string ProCode)
        {
            return environment.WebRootPath + $"\\Uploads\\{ProCode}";
        }

       

       public async Task<string> UploadImage(int id,string procode,IFormFile image)
        {
            string nameImage = Path.GetFileNameWithoutExtension(image.FileName);
            string nameExtension = Path.GetExtension(image.FileName);
            var timeNow = DateTime.Now.ToString("dd-MM-yyyy");
            string newImage = $"{id}-{timeNow}-{nameImage}{nameExtension}";
            var filePath=GetFilePath(procode);    
            if(!System.IO.Directory.Exists(filePath))
            {
                System.IO.Directory.CreateDirectory(filePath);
            }
            string imagePath = filePath + $"\\{newImage}";
            using(FileStream fileStream=new FileStream(imagePath, FileMode.Create))
            {
               await image.CopyToAsync(fileStream);
            }
            return newImage;
        }
        public string GetUrlImage(string imageName)
        {
            string hostUrl = "https://localhost:7119/";
            return hostUrl + "Uploads/Book/" + imageName;
        }
        public void DeleteImage(string ProCode, string nameImage)
        {
            var filePath = GetFilePath(ProCode);
            var imagePath = filePath + $"\\{nameImage}";
            if(File.Exists(imagePath))
            {
                File.Delete(imagePath);
            }
        }
    }
}
