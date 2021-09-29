using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPF_Receipt.Enums
{
    public enum EnumUnit
    {
        /// <summary>
        ///  ลัง
        /// </summary>
        Box = 1,
        /// <summary>
        /// ซอง
        /// </summary>
        Pack = 2,
        /// <summary>
        /// มัด
        /// </summary>
        BigPack = 3
    }

    public static class EnumUnitExtension
    {
        public static int Integer(this EnumUnit enumUnit) => ((int)enumUnit);
    }
}
