using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.DataAccess;
using SPF_Receipt.DataModel;
using System;

namespace SPF_Receipt.Controllers
{
    [Route("products/[action]")]
    public class ProductController : BaseController<IProductRepository, Product, Guid>
    {
        public ProductController(IProductRepository repository) : base(repository)
        {
        }

        protected override Func<Product, Guid> ObjectId => e => e.Id;

        protected override Func<Product, string> Ordering => e => e.Name;

        protected override string SuccessMessage => "ข้อมูลสินค้าสำเร็จ";

        protected override bool IsExists(Product request) => repository.Exists(e => e.Name == request.Name);

        protected override void UpdateValue(Product src, Product target)
        {
            src.Name = target.Name;
            src.Unit = target.Unit;
            src.Price = target.Price;
        }
    }
}
