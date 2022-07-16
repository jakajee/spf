using Microsoft.Extensions.DependencyInjection;
using SPF_Receipt.DataAccess;
using SPF_Receipt.Reports.Manager;

namespace SPF_Receipt.App_Config
{
    public static class ServiceConfig
    {
        public static void Configure(IServiceCollection services)
        {
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IPaymentRepository, PaymentRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IUnitRepository, UnitRepository>();

            services.AddScoped<IReportManager, ReportManager>();
        }
    }
}
