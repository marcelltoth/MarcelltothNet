using Identity.Api.Models;

namespace Identity.Api.Services
{
    public interface IUserService
    {
        ApplicationUser Authenticate(string userName, string password);

        void EnsureAdminUserCreated();
    }
    
    public class UserService : IUserService
    {
        public ApplicationUser Authenticate(string userName, string password)
        {
            throw new System.NotImplementedException();
        }

        public void EnsureAdminUserCreated()
        {
        }
    }
}