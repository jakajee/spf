
namespace SPF_Receipt.Reports.Handler
{
    public abstract class BaseTaxInvoiceHandler : BaseReportHandler
    {
        public override string ReportName => "TaxInvoice";

        public override string HeaderTitle1 => "ใบกำกับภาษี/ใบส่งสินค้า";

        public override string HeaderTitle2 => "TAX INVOICE / INVOICE";

        public override string HeaderTitle3 => "ต้นฉบับ";
    }

    public class TaxInvoiceOriginalHandler : BaseTaxInvoiceHandler
    {
        public override string NotTaxInvoiceText => string.Empty;
        public override string HeaderTitle3 => base.HeaderTitle3;
    }

    public class TaxInvoiceCopy1Handler : BaseTaxInvoiceHandler
    {
        public override string NotTaxInvoiceText => "(ไม่ใช่ใบกำกับภาษี)";
        public override string HeaderTitle3 => "สำเนา";
    }

    public class TaxInvoiceCopy2Handler : TaxInvoiceCopy1Handler
    {
    }
}
