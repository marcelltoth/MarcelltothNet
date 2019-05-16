using System;

namespace MarcellTothNet.Services.Files.Api.Models
{
    public class File
    {
        public Guid Id { get; set; }

        public string MimeType { get; set; }

        public byte[] Content { get; set; }

        public DateTimeOffset UploadDate { get; set; }

        public DateTimeOffset ModifyDate { get; set; }

        public string DisplayName { get; set; }
    }
}