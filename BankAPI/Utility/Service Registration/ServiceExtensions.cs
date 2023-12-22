using System.Reflection;

namespace BankAPI.Utility.Service_Registration
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            var typesWithAttribute = Assembly.GetExecutingAssembly().GetTypes()
                .Where(type => type.GetCustomAttributes<ServiceAttribute>().Any());

            foreach (var type in typesWithAttribute)
            {
                var attribute = type.GetCustomAttribute<ServiceAttribute>();
                if (attribute != null)
                {
                    var serviceInterface = attribute.InterfaceType;
                    switch (attribute.Lifetime)
                    {
                        case ServiceLifetime.Scoped:
                            services.AddScoped(serviceInterface, type);
                            break;
                        case ServiceLifetime.Singleton:
                            services.AddSingleton(serviceInterface, type);
                            break;
                        case ServiceLifetime.Transient:
                            services.AddTransient(serviceInterface, type);
                            break;
                    }
                }
            }

            return services;
        }
    }
}
