using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ManagerLibrary.Data
{
    public class MyDb:IdentityDbContext<ApplicationUser>
    {
        public MyDb(DbContextOptions options) : base(options) { }
        public DbSet<Book> books { get; set; }
        public DbSet<BookTransactionDetail> bookTransactionsDetail { get; set; }
        public DbSet<BookTransactions> bookTransactions { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<ImportReceipts> importReceipts { get; set; }
        public DbSet<ImportReceiptsDetail> importReceiptsDetails { get; set; }
        public DbSet<Members> members { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Book>(e =>
            {
                e.HasOne(e => e.Category)
                .WithMany(e => e.books)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            });
            builder.Entity<BookTransactionDetail>(e =>
            {
                e.HasOne(e => e.Book)
                .WithMany(e => e.bookTransactionDetails)
                .HasForeignKey(e => e.BookId)
                .OnDelete(DeleteBehavior.NoAction);
                e.HasOne(e => e.BookTransactions)
                .WithMany(e => e.bookTransactionDetails)
                .HasForeignKey(e => e.BookTransactionId)
                .OnDelete(DeleteBehavior.NoAction);
            });
            builder.Entity<BookTransactions>(e =>
            {
                e.HasOne(e => e.User)
                .WithMany(e => e.bookTransactions)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
                e.HasOne(e => e.members)
                .WithMany(e => e.bookTransactions)
                .HasForeignKey(e => e.MembersId)
                .OnDelete(DeleteBehavior.NoAction);
            });
            builder.Entity<ImportReceipts>(e =>
            {
                e.HasOne(e => e.User)
                .WithMany(e => e.importReceipts)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.NoAction);
                e.HasMany(e => e.importReceiptsDetails)
                .WithOne(e => e.ImportReceipts)
                .HasForeignKey(e => e.ImportReceiptId)
                .OnDelete(DeleteBehavior.NoAction);
            });
            builder.Entity<ImportReceiptsDetail>(e =>
            {
                e.HasOne(e => e.Book)
                .WithMany(e => e.importReceiptsDetails)
                .HasForeignKey(e => e.BookId)
                .OnDelete(DeleteBehavior.NoAction);
            });

        }
    }
}
