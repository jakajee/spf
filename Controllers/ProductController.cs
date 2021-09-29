using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.DataAccess;
using SPF_Receipt.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.Controllers
{
    [ApiController]
    [Route("products/[action]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository productRepository;

        public ProductController(
                IProductRepository productRepository
            )
        {
            this.productRepository = productRepository;
        }

        [HttpGet]
        public IEnumerable<Product> GetProductsAll()
        {
            var products = this.productRepository.FindAll();
            return products;
        }
    }
}
