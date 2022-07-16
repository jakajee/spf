using System;
using System.Collections.Generic;

namespace SPF_Receipt.ViewModel
{

    public class ReportModel
    {
        public ReportHeaderModel ReportHeader { get; set; }
        public IEnumerable<ReportDataModel<string, string>> ReportBody { get; set; }
        public ReportFooterModelExtend ReportFooter { get; set; }
    }

    public class ReportHeaderModel
    {
        public string ReceiptNumber { get; set; }
        public DateTime ReceiptDate { get; set; }
        public DateTime DueDate { get; set; }
        public string Payment { get; set; }
    }

    public class ReportFooterModel<TMoney>
    {
        public TMoney Total { get; set; }
        public TMoney Vat { get; set; }
        public TMoney GrandTotal { get; set; }
    }

    public class ReportFooterModelExtend : ReportFooterModel<string>
    {
        public string GrandTotalInThai { get; set; }
    }

    public class ReportDataModel<TMoney, TQty>
    {
        public string ProductName { get; set; }
        public string UnitName { get; set; }
        public TQty Qty { get; set; }
        public TMoney Price { get; set; }
        public TMoney TotalPrice { get; set; }
    }
}
