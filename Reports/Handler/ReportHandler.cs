using FastReport;
using FastReport.Export.PdfSimple;
using GreatFriends.ThaiBahtText;
using SPF_Receipt.ViewModel;
using System;
using System.Globalization;
using System.IO;
using System.Linq;

namespace SPF_Receipt.Reports.Handler
{
    public interface IReportHandler
    {
        byte[] GenerateReport(ReceiptRequestModel request);
    }

    public abstract class BaseReportHandler : IReportHandler
    {
        public abstract string ReportName { get; }
        public abstract string NotTaxInvoiceText { get; }
        public abstract string HeaderTitle1 { get; }
        public abstract string HeaderTitle2 { get; }
        public abstract string HeaderTitle3 { get; }

        public byte[] GenerateReport(ReceiptRequestModel request)
        {
            byte[] content;
            using (var memoryStream = new MemoryStream())
            {
                var report = new Report();
                var buildPath = AppContext.BaseDirectory;

                report.Load($"{buildPath}/Reports/{ReportName}.frx");
                SetReportData(request, report);

                report.Prepare();

                var pdfExport = new PDFSimpleExport();
                pdfExport.Export(report, memoryStream);
                content = memoryStream.ToArray();
            }

            return content;
        }       

        private void SetReportData(
            ReceiptRequestModel request,
            Report report)
        {
            var reportModel = GetReportModel(request);

            // header
            report.SetParameterValue("NotTaxInvoiceText", NotTaxInvoiceText);
            report.SetParameterValue("HeaderTitle1", HeaderTitle1);
            report.SetParameterValue("HeaderTitle2", HeaderTitle2);
            report.SetParameterValue("HeaderTitle3", HeaderTitle3);
            report.SetParameterValue("CustomerName", request.Customer.FullName);
            report.SetParameterValue("Address1", request.Customer.Address1);
            report.SetParameterValue("Address2", request.Customer.Address2);
            report.SetParameterValue("TaxNumber", request.Customer.TaxNumber);
            report.SetParameterValue("ReceiptNumber", reportModel.ReportHeader.ReceiptNumber);
            report.SetParameterValue("ReceiptDate", reportModel.ReportHeader.ReceiptDate.ToThaiDate());
            report.SetParameterValue("Payment", reportModel.ReportHeader.Payment);
            report.SetParameterValue("DueDate", reportModel.ReportHeader.DueDate.ToThaiDate());

            // body
            report.RegisterData(reportModel.ReportBody.ToList(), "ProductList");

            // footer
            report.SetParameterValue("Total", reportModel.ReportFooter.Total);
            report.SetParameterValue("Vat", reportModel.ReportFooter.Vat);
            report.SetParameterValue("GrandTotal", reportModel.ReportFooter.GrandTotal);
            report.SetParameterValue("GrandTotalInThai", reportModel.ReportFooter.GrandTotalInThai);
        }

        private ReportModel GetReportModel(ReceiptRequestModel request)
        {
            var reportModel = new ReportModel();
            var recordCount = 14;

            // header
            reportModel.ReportHeader = request.ReceiptHeader;

            // body
            var data = Enumerable.Range(1, recordCount).Select(e => new ReportDataModel<string, string>()).ToList();
            for (int i = 0; i < request.ProductList.Count() && request.ProductList.Count() < recordCount; i++)
            {
                var requestProduct = request.ProductList.ElementAt(i);
                var reportProduct = data[i];
                var qtyFormat = requestProduct.Qty % 1 != 0 ? "{0:N2}" : "{0:N0}";

                reportProduct.ProductName = requestProduct.ProductName;
                reportProduct.UnitName = requestProduct.UnitName;
                reportProduct.Qty = string.Format(qtyFormat, requestProduct.Qty);
                reportProduct.Price = string.Format("{0:N2}", requestProduct.Price); // need to add .- or not
                reportProduct.TotalPrice = string.Format("{0:N2}", requestProduct.TotalPrice); // need to add .- or not
            }
            reportModel.ReportBody = data;

            // footer
            reportModel.ReportFooter = new ReportFooterModelExtend
            {
                Total = request.ReceiptSummary.Total.ToString("N2"),
                Vat = request.ReceiptSummary.Vat.ToString("N2"),
                GrandTotal = request.ReceiptSummary.GrandTotal.ToString("N2"),
                GrandTotalInThai = request.ReceiptSummary.GrandTotal.ThaiBahtText()
            };

            return reportModel;
        }       
    }
    public static class DateTimeExtension
    {
        private static CultureInfo CultureInfo = new CultureInfo("th-TH");
        public static string ToThaiDate(this DateTime src)
        {
            return src.ToString("dd-MM-yy", CultureInfo);
        }
    }
}
