using SPF_Receipt.DataModel;
using System.Collections.Generic;

namespace SPF_Receipt.ViewModel
{
    public class ReceiptRequestModel
    {
        public ReportHeaderModel ReceiptHeader { get; set; }
        public Customer Customer { get; set; }
        public IEnumerable<ReportDataModel<double, decimal>> ProductList { get; set; }
        public ReportFooterModel<decimal> ReceiptSummary { get; set; }
    }

   
}
