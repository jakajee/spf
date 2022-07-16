using LiteDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace SPF_Receipt.DataAccess.Base
{
    public abstract class BaseDataAccess<TObject> : IBaseDataAccess<TObject>
        where TObject : class
    {
        public void Delete(object id)
            => InitConnection(table => table.Delete(new BsonValue(id)));

        public IEnumerable<TObject> FindAll(Expression<Func<TObject, bool>> expr)
            => InitConnection(table => table.Find(expr).ToList());

        public IEnumerable<TObject> FindAll()
            => InitConnection(table => table.FindAll().ToList());

        public TObject FindOne(object id)
            => InitConnection(table => table.FindById(new BsonValue(id)));

        public virtual void Insert(params TObject[] entity)
            => InitConnection(table => table.Insert(entity));

        public void Update(params TObject[] entity)
            => InitConnection(table => table.Update(entity));

        public bool Exists(Expression<Func<TObject, bool>> expr)
            => InitConnection(table => table.Exists(expr));

        private TResponse InitConnection<TResponse>(Func<ILiteCollection<TObject>, TResponse> action)
        {
            using (var db = new LiteDatabase(AppSettings.ConnectionString))
            {
                return action(db.GetCollection<TObject>());
            }
        }
    }
}
