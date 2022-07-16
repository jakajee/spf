using System;

namespace SPF_Receipt.DataModel
{
    public class Product
    {        
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Unit Unit { get; set; }
        public double Price { get; set; }
    }
}
