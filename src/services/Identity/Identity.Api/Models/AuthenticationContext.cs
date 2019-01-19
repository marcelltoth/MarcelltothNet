using Identity.Api.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Identity.Api.Models
{
    public class AuthenticationContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        private readonly DatabaseOptions _dbOptions;
        
        public string SchemaName => _dbOptions.SchemaName;
        
        public AuthenticationContext(DbContextOptions options, IOptions<DatabaseOptions> dbOptions) : base(options)
        {
            _dbOptions = dbOptions.Value;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            // Customize the ASP.NET Identity model and override the defaults if needed.
            
            builder.Entity<ApplicationUser>(entity =>
            {
                entity.ToTable(name:"AspNetUser",schema: SchemaName);
                entity.Property(e => e.Id).HasColumnName("AspNetUserId");
 
            });
            
            builder.Entity<ApplicationUser>(entity =>
            {
                entity.ToTable(name:"AspNetUser",schema: SchemaName);
                entity.Property(e => e.Id).HasColumnName("AspNetUserId");
 
            });
 
            builder.Entity<ApplicationRole>(entity =>
            {
                entity.ToTable(name: "AspNetRole", schema: SchemaName);
                entity.Property(e => e.Id).HasColumnName("AspNetRoleId");
 
            });
 
            builder.Entity<IdentityUserClaim<int>>(entity =>
            {
                entity.ToTable("AspNetUserClaim", SchemaName);
                entity.Property(e => e.UserId).HasColumnName("AspNetUserId");
                entity.Property(e => e.Id).HasColumnName("AspNetUserClaimId");
             
            });
 
            builder.Entity<IdentityUserLogin<int>>(entity =>
            {
                entity.ToTable("AspNetUserLogin", SchemaName);
                entity.Property(e => e.UserId).HasColumnName("AspNetUserId");
             
            });
 
            builder.Entity<IdentityRoleClaim<int>>(entity =>
            {
                entity.ToTable("AspNetRoleClaim", SchemaName);
                entity.Property(e => e.Id).HasColumnName("AspNetRoleClaimId");
                entity.Property(e => e.RoleId).HasColumnName("AspNetRoleId");
            });
 
            builder.Entity<IdentityUserRole<int>>(entity =>
            {
                entity.ToTable("AspNetUserRole", SchemaName);
                entity.Property(e => e.UserId).HasColumnName("AspNetUserId");
                entity.Property(e => e.RoleId).HasColumnName("AspNetRoleId");
 
            });
 
 
            builder.Entity<IdentityUserToken<int>>(entity =>
            {
                entity.ToTable("AspNetUserToken", SchemaName);
                entity.Property(e => e.UserId).HasColumnName("AspNetUserId");
               
            });
        }

        
    }
}