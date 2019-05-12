using System;
using System.Threading.Tasks;
using MarcellTothNet.Services.Files.Api.Contract;
using MarcellTothNet.Services.Files.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace MarcellTothNet.Services.Files.Api.Controllers
{
    [Route("files")]
    public class FileController : Controller
    {
        private readonly FilesDbContext _dbContext;

        public FileController(FilesDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{fileGuid}")]
        public async Task<IActionResult> Get(Guid fileGuid)
        {
            var file = await _dbContext.Files.FindAsync(fileGuid);
            if (file == null)
                return NotFound();

            return File(file.Content, file.MimeType);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UploadFileDto newFile)
        {
            var model = new File
            {
                Content = newFile.Content,
                MimeType = newFile.MimeType,
                UploadDate = DateTimeOffset.UtcNow,
                ModifyDate = DateTimeOffset.UtcNow
            };

            _dbContext.Files.Add(model);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new {fileGuid = model.Id}, model.Id);
        }
    }
}