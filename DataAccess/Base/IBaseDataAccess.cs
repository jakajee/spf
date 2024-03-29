﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace SPF_Receipt.DataAccess.Base
{
    public interface IBaseDataAccess<TObject> where TObject : class
    {
        TObject FindOne(object id);
        IEnumerable<TObject> FindAll(Expression<Func<TObject, bool>> expr);
        IEnumerable<TObject> FindAll();

        void Insert(params TObject[] entity);
        void Delete(object id);
        void Update(params TObject[] entity);
        bool Exists(Expression<Func<TObject, bool>> expr);
    }
}
