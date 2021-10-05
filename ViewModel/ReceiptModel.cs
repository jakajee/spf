using SPF_Receipt.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.ViewModel
{
    public class ReceiptModel
    {
        public string ReceiptNumber { get; set; }
        public string ReceiptDateString { get; set; }
        public string DueDateString { get; set; }
        public Payment Payment { get; set; }
        public Customer Customer { get; set; }
        public IEnumerable<ProductReceipt<double>> ProductList { get; set; }
        public double Total { get; set; }
        public double Tax { get; set; }
        public double GrandTotal { get; set; }
    }

    public class ProductReceipt<TMoney>
    {
        public string ProductName { get; set; }
        public string UnitName  { get; set; }
        public string Qty { get; set; }
        public TMoney Price { get; set; }
        public TMoney TotalPrice { get; set; }
    }
}
