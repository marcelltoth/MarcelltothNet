namespace MarcellTothNet.Services.Files.Api.Contract
{
    public class UploadFileDto
    {
        public string MimeType { get; set; }

        public byte[] Content { get; set; }

        public string DisplayName { get; set; }
    }
}