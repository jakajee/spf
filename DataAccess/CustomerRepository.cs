using SPF_Receipt.DataAccess.Base;
using SPF_Receipt.DataModel;

namespace SPF_Receipt.DataAccess
{
    #region Interface

    public interface ICustomerRepository : IBaseDataAccess<Customer>
    {

    }

    #endregion

    public class CustomerRepository : BaseDataAccess<Customer>, ICustomerRepository
    {
    }
}
