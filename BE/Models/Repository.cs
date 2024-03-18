namespace ManagerLibrary.Models
{
    public class Repository<T>
    {
        public int StatusCode { get;set; }
        public T? Message { get; set; }
        public T? Data { get; set; }
        public static Repository<T> WithData(T data,int statusCode)
        {
            return new Repository<T> { Data = data, StatusCode = statusCode };
        }
        public static Repository<T> WithMessage(T message, int statusCode)
        {
            return new Repository<T> { Message=message, StatusCode = statusCode };
        }

    }
}
