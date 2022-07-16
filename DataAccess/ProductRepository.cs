using SPF_Receipt.DataAccess.Base;
using SPF_Receipt.DataModel;

namespace SPF_Receipt.DataAccess
{
    #region Interface

    public interface IProductRepository : IBaseDataAccess<Product>
    {

    }

    #endregion

    public class ProductRepository : BaseDataAccess<Product>, IProductRepository
    {
    }
}
