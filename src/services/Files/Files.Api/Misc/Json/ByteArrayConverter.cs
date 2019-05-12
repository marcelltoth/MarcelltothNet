using System;
using Newtonsoft.Json;

namespace MarcellTothNet.Services.Files.Api.Misc.Json
{
    public class ByteArrayConverter : JsonConverter
    {
        public override object ReadJson(
            JsonReader reader,
            Type objectType,
            object existingValue,
            JsonSerializer serializer)
        {
            string base64String = serializer.Deserialize<string>(reader);
            return Convert.FromBase64String(base64String);
        }

        public override void WriteJson(
            JsonWriter writer,
            object value,
            JsonSerializer serializer)
        {
            string base64String = Convert.ToBase64String((byte[])value);

            serializer.Serialize(writer, base64String);
        }

        public override bool CanRead => true;

        public override bool CanConvert(Type t)
        {
            return typeof(byte[]).IsAssignableFrom(t);
        }
    }
}