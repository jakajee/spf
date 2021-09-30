using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.DataAccess;
using SPF_Receipt.DataModel;
using SPF_Receipt.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.Controllers
{
    [Route("products/[action]")]
    public class ProductController : BaseController<IProductRepository, Product>
    {
        public ProductController(IProductRepository repository) : base(repository)
        {
        }

        protected override Func<Product, Product, bool> ExistsExpression => (data, request) => data.Name == request.Name;

        protected override Func<Product, object> ObjectId => e => e.Id;

        protected override Func<Product, string> Ordering => e => e.Name;

        protected override void UpdateValue(Product src, Product target)
        {
            src.Name = target.Name;
            src.Unit = target.Unit;
        }
    }
}
