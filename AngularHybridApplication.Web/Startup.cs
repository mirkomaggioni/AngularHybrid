using System.Net.Http.Formatting;
using System.Reflection;
using System.Web.Http;
using AngularHybridApplication.Core;
using AngularHybridApplication.Core.Models;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.Owin;
using Newtonsoft.Json;
using Owin;

[assembly: OwinStartup(typeof(AngularHybridApplication.Web.Startup))]

namespace AngularHybridApplication.Web
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			var containerBuilder = new ContainerBuilder();
			containerBuilder.RegisterModule(new ModuloCore());
			containerBuilder.RegisterApiControllers(Assembly.GetExecutingAssembly());
			var container = containerBuilder.Build();

			var config = new HttpConfiguration
			{
				DependencyResolver = new AutofacWebApiDependencyResolver(container)
			};

			config.MapHttpAttributeRoutes();

			config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);

			var builder = new ODataConventionModelBuilder();
			builder.EntitySet<Blog>("Blogs");
			builder.EntitySet<Post>("Posts");
			config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
			config.Filter().Expand().Select().OrderBy().MaxTop(null).Count();

			// JSON formatter
			JsonMediaTypeFormatter formatter = config.Formatters.JsonFormatter;
			formatter.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;

			app.UseWebApi(config);
		}
	}
}
