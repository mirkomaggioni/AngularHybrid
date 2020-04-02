using System.Data.Entity;

namespace AngularHybridApplication.Core.Models
{
	public class SpaContext : DbContext
	{
		public DbSet<Blog> Blogs { get; set; }
		public DbSet<Post> Posts { get; set; }
	}
}
