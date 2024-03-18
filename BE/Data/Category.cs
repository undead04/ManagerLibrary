﻿namespace ManagerLibrary.Data
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ICollection<Book>? books { get; set; }
    }
}
