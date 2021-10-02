using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.DataAccess.Base;
using SPF_Receipt.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SPF_Receipt.Controllers
{
    [ApiController]
    public abstract class BaseController<IRepository, TModel, TID> : ControllerBase
        where TModel : class
        where IRepository : IBaseDataAccess<TModel>
    {
        protected readonly IRepository repository;

        public BaseController(
                IRepository repository
            )
        {
            this.repository = repository;
        }
        protected abstract Func<TModel, TID> ObjectId { get; }
        protected abstract Func<TModel, string> Ordering { get; }
        protected abstract string SuccessMessage { get; }
        protected virtual string GetDuplicateMessage() => "ข้อมูลซ้ำ แก้ไขข้อมูลและลองใหม่อีกครั้ง";

        protected abstract void UpdateValue(TModel src, TModel target);
        protected abstract bool IsExists(TModel request);

        [HttpGet]
        public IEnumerable<TModel> GetAll() => repository.FindAll().OrderBy(e => Ordering(e));

        [HttpPost]
        public BaseResponse Create(TModel model)
        {
            if (IsExists(model))
            {
                return new BaseResponse(GetDuplicateMessage());
            }

            repository.Insert(model);
            return new BaseResponse(message: $"เพิ่ม{SuccessMessage}");
        }

        [HttpPost]
        public BaseResponse Update(TModel model)
        {
            var data = repository.FindOne(ObjectId(model));

            UpdateValue(data, model);
            repository.Update(model);
            return new BaseResponse(message: $"แก้ไข{SuccessMessage}");
        }

        [HttpPost]
        public BaseResponse Delete(TID id)
        {
            repository.Delete(id);
            return new BaseResponse(message: $"ลบ{SuccessMessage}");
        }
    }
}
