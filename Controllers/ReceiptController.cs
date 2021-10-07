using FastReport;
using FastReport.Export.PdfSimple;
using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.ViewModel;
using System;
using System.IO;
using System.Linq;
using GreatFriends.ThaiBahtText;
using System.Globalization;

namespace SPF_Receipt.Controllers
{
    [ApiController]
    [Route("receipts/[action]")]
    public class ReceiptController : ControllerBase
    {
        [HttpPost]
        public FileContentResult DownloadTaxInvoice(ReceiptRequestModel request) => DownloadReport(request);        

        [HttpPost]
        public FileContentResult DownloadReceipt(ReceiptRequestModel request) => DownloadReport(request, "Receipt");

        private FileContentResult DownloadReport(ReceiptRequestModel request, string reportName = "TaxInvoice", string headerTitle3 = "ต้นฉบับ")
        {
            byte[] content;
            using (var memoryStream = new MemoryStream())
            {
                var report = new Report();
                var buildPath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);

                report.Load($"{buildPath}/Reports/{reportName}.frx");
                SetReportData(request, report, headerTitle3);

                report.Prepare();

                var pdfExport = new PDFSimpleExport();
                pdfExport.Export(report, memoryStream);                
                content = memoryStream.ToArray();
            }

            var fileName = $"{reportName}_{DateTime.Now.ToString("yyyyMMdd_HHmm")}.pdf";

            Response.Headers.Add("X-File-Name", fileName);

            return new FileContentResult(content, "application/pdf")
            {
                FileDownloadName = fileName
            };
        }

        private void SetReportData(ReceiptRequestModel request, Report report, string headerTitle3 = "ต้นฉบับ")
        {
            var reportModel = GetReportModel(request);

            // header
            report.SetParameterValue("NotTaxInvoiceText", "");
            report.SetParameterValue("HeaderTitle1", "ใบกำกับภาษี/ใบส่งสินค้า");
            report.SetParameterValue("HeaderTitle2", "TAX INVOICE / INVOICE");
            report.SetParameterValue("HeaderTitle3", "ต้นฉบับ");
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

            // header
            reportModel.ReportHeader = request.ReceiptHeader;

            // body
            var data = Enumerable.Range(1, 28).Select(e => new ReportDataModel<string, string>()).ToList();
            for (int i = 0; i < request.ProductList.Count() && request.ProductList.Count() < 28; i++)
            {
                var requestProduct = request.ProductList.ElementAt(i);
                var reportProduct = data[i];

                reportProduct.ProductName = requestProduct.ProductName;
                reportProduct.UnitName = requestProduct.UnitName;
                reportProduct.Qty = requestProduct.Qty.ToString("D");
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
