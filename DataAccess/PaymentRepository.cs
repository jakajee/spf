using SPF_Receipt.DataAccess.Base;
using SPF_Receipt.DataModel;

namespace SPF_Receipt.DataAccess
{
    #region interface

    public interface IPaymentRepository : IBaseDataAccess<Payment>
    {

    }

    #endregion

    public class PaymentRepository : BaseDataAccess<Payment>, IPaymentRepository
    {
    }
}
