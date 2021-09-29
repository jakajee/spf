using Microsoft.Extensions.DependencyInjection;
using SPF_Receipt.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.App_Config
{
    public static class ServiceConfig
    {
        public static void Configure(IServiceCollection services)
        {
            services.AddTransient<IProductRepository, ProductRepository>();
        }
    }
}
