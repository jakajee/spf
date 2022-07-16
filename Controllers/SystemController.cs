using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.DataAccess;
using SPF_Receipt.DataModel;
using System.Collections.Generic;
using System.Linq;

namespace SPF_Receipt.Controllers
{
    [ApiController]
    [Route("system/[action]")]
    public class SystemController : ControllerBase
    {
        private readonly IPaymentRepository paymentRepository;
        private readonly IUnitRepository unitRepository;

        public SystemController(
                IPaymentRepository paymentRepository,
                IUnitRepository unitRepository                
            )
        {
            this.paymentRepository = paymentRepository;
            this.unitRepository = unitRepository;
        }

        [HttpGet]
        public IEnumerable<Payment> GetPayments()
            => paymentRepository.FindAll().OrderBy(e => e.Name);

        [HttpGet]
        public IEnumerable<Unit> GetUnits()
            => unitRepository.FindAll().OrderBy(e => e.Name);
    }
}
