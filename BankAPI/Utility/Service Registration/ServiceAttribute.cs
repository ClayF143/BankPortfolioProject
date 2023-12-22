namespace BankAPI.Utility
{
    public class ServiceAttribute : Attribute
    {
        public Type InterfaceType { get; }
        public ServiceLifetime Lifetime { get; }
        public ServiceAttribute(Type interfaceType, ServiceLifetime lifetime = ServiceLifetime.Scoped)
        {
            InterfaceType = interfaceType;
            Lifetime = lifetime;
        }
    }
}
