using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.DataAccess;
using SPF_Receipt.DataModel;
using System;

namespace SPF_Receipt.Controllers
{
    [Route("customers/[action]")]
    public class CustomerController : BaseController<ICustomerRepository, Customer, Guid>
    {
        public CustomerController(ICustomerRepository repository) : base(repository)
        {
        }

        protected override Func<Customer, Guid> ObjectId => e => e.Id;

        protected override Func<Customer, string> Ordering => e => e.FullName;

        protected override string SuccessMessage => "ข้อมูลลูกค้าสำเร็จ";

        protected override bool IsExists(Customer request)
            => repository.Exists(e => e.FullName == request.FullName);

        protected override void UpdateValue(Customer src, Customer target)
        {
            src.FullName = target.FullName;
            src.Address1 = target.Address1;
            src.Address2 = target.Address2;
            src.TaxNumber = target.TaxNumber;
        }
    }
}
