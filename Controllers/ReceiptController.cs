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

                report.Load($"{buildPath}/Reports/ReceiptReport.frx");
                var number = report.GetParameter("ReceiptNumber");
                number.Value = "612345678";

                var list = new List<ProductReceipt<string>>
                {
                    new ProductReceipt<string>
                    {
                        Price = "1234",
                        ProductName = "test",
                        Qty = "55",
                        TotalPrice = "777",
                        UnitName = "444"
                    },
                    new ProductReceipt<string>
                    {
                        Price = "1234",
                        ProductName = "test",
                        Qty = "55",
                        TotalPrice = "777",
                        UnitName = "444"
                    }
                };

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
