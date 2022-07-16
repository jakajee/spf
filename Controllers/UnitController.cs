using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.DataAccess;
using SPF_Receipt.DataModel;
using System;

namespace SPF_Receipt.Controllers
{
    [Route("units/[action]")]
    public class UnitController : BaseController<IUnitRepository, Unit, int>
    {
        public UnitController(IUnitRepository repository) : base(repository)
        {
        }

        protected override Func<Unit, int> ObjectId => e => e.Id;

        protected override Func<Unit, string> Ordering => e => e.Name;

        protected override string SuccessMessage => "ข้อมูลหน่วยสำเร็จ";

        protected override bool IsExists(Unit request) => repository.Exists(e => e.Name == request.Name);

        protected override void UpdateValue(Unit src, Unit target)
        {
            src.Name = target.Name;
        }
    }
}
