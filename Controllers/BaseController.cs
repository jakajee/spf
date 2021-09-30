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
    public abstract class BaseController<IRepository, TModel> : ControllerBase
        where TModel : class
        where IRepository : IBaseDataAccess<TModel>
    {
        private readonly IRepository repository;

        public BaseController(
                IRepository repository
            )
        {
            this.repository = repository;
        }

        protected abstract Func<TModel, TModel, bool> ExistsExpression { get; }
        protected abstract Func<TModel, object> ObjectId { get; }
        protected abstract Func<TModel, string> Ordering { get; }

        protected virtual string GetDuplicateMessage() => "ข้อมูลซ้ำ แก้ไขข้อมูลและลองใหม่อีกครั้ง";
        protected abstract void UpdateValue(TModel src, TModel target);

        [HttpGet]
        public IEnumerable<TModel> GetAll()
            => repository.FindAll();

        [HttpPost]
        public BaseResponse Create(TModel model)
        {
            if (repository.Exists(e => ExistsExpression(e, model)))
            {
                return new BaseResponse(GetDuplicateMessage());
            }

            repository.Insert(model);
            return new BaseResponse();
        }

        [HttpPost]
        public BaseResponse Update(TModel model)
        {
            var data = repository.FindOne(ObjectId(model));

            UpdateValue(data, model);
            repository.Update(model);
            return new BaseResponse();
        }

        [HttpPost]
        public BaseResponse Delete(object id)
        {
            repository.Delete(id);
            return new BaseResponse();
        }
    }
}
