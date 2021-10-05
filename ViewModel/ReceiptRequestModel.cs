using SPF_Receipt.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.ViewModel
{
    public class ReceiptRequestModel
    {
        public ReportHeaderModel ReceiptHeader { get; set; }
        public Customer Customer { get; set; }
        public IEnumerable<ReportDataModel<double, int>> ProductList { get; set; }
        public ReportFooterModel<decimal> ReceiptSummary { get; set; }
    }

   
}
