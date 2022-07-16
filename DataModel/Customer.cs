using System;

namespace SPF_Receipt.DataModel
{
    public class Customer
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string TaxNumber { get; set; }
    }
}
