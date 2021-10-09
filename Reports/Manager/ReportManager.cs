using SPF_Receipt.Reports.Handler;
using SPF_Receipt.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.Reports.Manager
{
    public interface IReportManager
    {
        List<byte[]> GenerateReport(ReceiptRequestModel request);
    }

    public class ReportManager : IReportManager
    {
        private readonly List<IReportHandler> reportHandlers;
        public ReportManager()
        {
            reportHandlers = new List<IReportHandler>()
            {
                new TaxInvoiceOriginalHandler(),
                new TaxInvoiceCopy1Handler(),
                new TaxInvoiceCopy2Handler(),
                new ReceiptOrignalHandler(),
                new ReceiptCopyHandler()
            };
        }

        public List<byte[]> GenerateReport(ReceiptRequestModel request)
        {
            var listOutput = new List<byte[]>();
            foreach (var item in reportHandlers)
            {
                listOutput.Add(item.GenerateReport(request));
            }

            return listOutput;
        }
    }
}
