﻿namespace ManagerLibrary.Models.DTO
{
    public class RoleDetailDTO
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public ClaimsModel? claims { get; set; }
    }
}
