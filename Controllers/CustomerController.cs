﻿using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.DataAccess;
using SPF_Receipt.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.Controllers
{
    [Route("customers/[action]")]
    public class CustomerController : BaseController<ICustomerRepository, Customer>
    {
        public CustomerController(ICustomerRepository repository) : base(repository)
        {
        }

        protected override Func<Customer, Customer, bool> ExistsExpression => (data, request) => data.FullName == request.FullName;

        protected override Func<Customer, object> ObjectId => e => e.Id;

        protected override Func<Customer, string> Ordering => e => e.FullName;

        protected override void UpdateValue(Customer src, Customer target)
        {
            src.FullName = target.FullName;
            src.Address1 = target.Address1;
            src.Address2 = target.Address2;
            src.Address3 = target.Address3;
        }
    }
}
