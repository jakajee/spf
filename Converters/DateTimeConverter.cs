using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SPF_Receipt.Converters
{
    public class DateTimeConverter : JsonConverter<DateTime>
    {
        private const string DATETIME_FORMAT = "dd-MMM-yyyy";

        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            if (value == null)
            {
                return new DateTime();
            }

            DateTime.TryParseExact(value, DATETIME_FORMAT, null, System.Globalization.DateTimeStyles.None, out DateTime res);

            return res;
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString(DATETIME_FORMAT));
        }
    }
}
