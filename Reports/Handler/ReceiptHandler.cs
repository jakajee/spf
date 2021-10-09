using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.Reports.Handler
{
    public class ReceiptOrignalHandler : BaseReportHandler
    {
        public override string ReportName => "Receipt";

        public override string NotTaxInvoiceText => "(ไม่ใช่ใบกำกับภาษี)";

        public override string HeaderTitle1 => "ใบเสร็จรับเงิน";

        public override string HeaderTitle2 => "RECEIPT";

        public override string HeaderTitle3 => "ต้นฉบับ";
    }

    public class ReceiptCopyHandler : ReceiptOrignalHandler
    {
        public override string HeaderTitle3 => "สำเนา";
    }
}
