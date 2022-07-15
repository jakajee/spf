using SPF_Receipt.DataAccess.Base;
using SPF_Receipt.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.DataAccess
{
    #region interface

    public interface IUnitRepository : IBaseDataAccess<Unit>
    {

    }

    #endregion

    public class UnitRepository : BaseDataAccess<Unit>, IUnitRepository
    {
        public override void Insert(params Unit[] entity)
        {
            var maxId = FindAll().Max(e => e.Id);
            for (int i = 0; i < entity.Length; i++)
            {
                maxId++;
                entity[i].Id = maxId;
            }

            base.Insert(entity);
        }
    }
}
