namespace ManagerLibrary.Repository.PasswordRepository
{
    public class PasswordRepository : IPasswordRepository
    {
        public string CreatePassword()
        {
            Random random = new Random();
            string password = "";
            for (int i = 1; i <= 8; i++)
            {
                switch (i)
                {
                    case 1:
                    case 2:
                        int number = random.Next(65, 91);
                        password += (char)number;
                        break;
                    case 3:
                    case 4:
                        password += (char)random.Next(97, 123);
                        break;
                    case 5:
                    case 6:
                        password += (char)random.Next(35, 39);
                        break;
                    case 7:
                    case 8:
                        password += random.Next(1, 10);
                        break;
                }
            }
            return password;
        }
    }
}
