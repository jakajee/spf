using LiteDB;
using SPF_Receipt.DataModel;
using SPF_Receipt.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.App_Config
{
    public static class DataInitializer
    {
        public static void Init()
        {
            using (var db = new LiteDatabase(AppSettings.ConnectionString))
            {
                db.InitUnit();
                db.InitCustomer();
                db.InitPayment();
                db.InitProduct();
            }
        }

        private static void InitUnit(this ILiteDatabase db)
        {
            var units = db.GetCollection<Unit>();

            if (!units.Exists(e => e.Id == EnumUnit.Box.Integer()))
            {
                units.Insert(new Unit { Id = EnumUnit.Box.Integer(), Name = "ลัง" });
            }

            if (!units.Exists(e => e.Id == EnumUnit.Pack.Integer()))
            {
                units.Insert(new Unit { Id = EnumUnit.Pack.Integer(), Name = "ซอง" });
            }

            if (!units.Exists(e => e.Id == EnumUnit.BigPack.Integer()))
            {
                units.Insert(new Unit { Id = EnumUnit.BigPack.Integer(), Name = "มัด" });
            }
        }

        private static void InitCustomer(this ILiteDatabase db)
        {
            var customers = db.GetCollection<Customer>();
            var initialCustomer = "ห้างหุ้นส่วนจำกัด วงศ์วิวัฒน์พืชผล (สำนักงานใหญ่)";

            if (!customers.FindAll().Any())
            {
                customers.Insert(new Customer
                {
                    FullName = initialCustomer,
                    Address1 = "59/1 ถนนทรงวาด แขวงจักรวรรดิ์",
                    Address2 = "เขตสัมพันธวงศ์ กรุงเทพมหานคร 10100",
                    Address3 = "เลขประจำตัวผู้เสียภาษีอากร 010353017753"
                });
            }
        }

        private static void InitPayment(this ILiteDatabase db)
        {
            var payments = db.GetCollection<Payment>();
            var initialPay = "เงินสด";

            if (!payments.Exists(e => e.Id == 1))
            {
                payments.Insert(new Payment
                {
                    Id = 1,
                    Name = initialPay
                });
            }
        }

        private static void InitProduct(this ILiteDatabase db)
        {
            var products = db.GetCollection<Product>();
            var unit = db.GetCollection<Unit>();

            if (!products.FindAll().Any())
            {
                products.Insert(new Product
                {
                    Name = "มะกะโรนี - ข้องอ",
                    Unit = unit.FindById(new BsonValue(EnumUnit.Box.Integer())),
                });
                products.Insert(new Product
                {
                    Name = "หมี่เตี๊ยว",
                    Unit = unit.FindById(new BsonValue(EnumUnit.BigPack.Integer()))
                });
                products.Insert(new Product
                {
                    Name = "หมี่ซั่วจีนแดง (40 ซอง)",
                    Unit = unit.FindById(new BsonValue(EnumUnit.Box.Integer())),
                });
            }
        }
    }
}
