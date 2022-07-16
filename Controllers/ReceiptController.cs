using Microsoft.AspNetCore.Mvc;
using SPF_Receipt.ViewModel;
using System;
using System.IO;
using PdfSharp.Pdf;
using PdfSharp.Pdf.IO;
using SPF_Receipt.Reports.Manager;

namespace SPF_Receipt.Controllers
{
    [ApiController]
    [Route("receipts/[action]")]
    public class ReceiptController : ControllerBase
    {
        private readonly IReportManager reportManager;

        public ReceiptController(
                IReportManager reportManager
            )
        {
            this.reportManager = reportManager;
        }

        [HttpPost]
        public FileContentResult DownloadTaxInvoice(ReceiptRequestModel request)
        {
            var fileName = GetReportFileName();
            var reportByte = this.reportManager.GenerateReport(request);
            var content = MergePdf(reportByte.ToArray());

            this.reportManager.GenerateReport(request);

            Response.Headers.Add("X-File-Name", fileName);

            return new FileContentResult(content, "application/pdf")
            {
                FileDownloadName = fileName
            };
        }

        private string GetReportFileName(string reportName = "Taxinvoice") => $"{reportName}_{DateTime.Now.ToString("yyyyMMdd_HHmm")}.pdf";

        private byte[] MergePdf(params byte[][] srcPDFs)
        {
            using (var ms = new MemoryStream())
            {
                using (var resultPDF = new PdfDocument(ms))
                {
                    foreach (var pdf in srcPDFs)
                    {
                        using (var src = new MemoryStream(pdf))
                        {
                            using (var srcPDF = PdfReader.Open(src, PdfDocumentOpenMode.Import))
                            {
                                for (var i = 0; i < srcPDF.PageCount; i++)
                                {
                                    resultPDF.AddPage(srcPDF.Pages[i]);
                                }
                            }
                        }
                    }
                    resultPDF.Save(ms);
                    return ms.ToArray();
                }
            }
        }
    }

    
}
