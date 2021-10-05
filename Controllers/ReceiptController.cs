using FastReport;
using FastReport.Export.PdfSimple;
using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.Controllers
{
    [ApiController]
    [Route("receipts/[action]")]
    public class ReceiptController : ControllerBase
    {
        [HttpGet]
        public FileContentResult Download()
        {
            byte[] content;
            using (var memoryStream = new MemoryStream())
            {
                var report = new Report();
                var buildPath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);

                report.Load($"{buildPath}/Reports/TaxInvoice.frx");
                var number = report.GetParameter("ReceiptNumber");
                number.Value = "612345678";

                var list = Enumerable.Range(1, 20).Select(e => new ProductReceipt<string>
                {
                    Price = "100",
                    ProductName = "hehg",
                    Qty = "heh",
                    TotalPrice = "efef",
                    UnitName = "ลัง"
                }).ToList();

                report.RegisterData(list, "ProductList");


                report.Prepare();

                var pdfExport = new PDFSimpleExport();
                pdfExport.Export(report, memoryStream);

                content = memoryStream.ToArray();
            }


            return new FileContentResult(content, "application/pdf")
            {
                FileDownloadName = $"Receipt_{DateTime.Now.ToString("yyyyMMdd_HHmm")}.pdf"
            };
        }
    }
}
