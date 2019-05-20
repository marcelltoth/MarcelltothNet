using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MarcellTothNet.Services.Files.Api.Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using File = MarcellTothNet.Services.Files.Api.Models.File;

namespace MarcellTothNet.Services.Files.Api.Controllers
{
    [Route("api/v1/files")]
    public class FileController : Controller
    {
        private readonly FilesDbContext _dbContext;

        public FileController(FilesDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Authorize("CanList")]
        public async Task<IActionResult> ListAll()
        {
            return Ok(await _dbContext.Files.Select(f => new File
            {
                Id = f.Id,
                MimeType = f.MimeType,
                ModifyDate = f.ModifyDate,
                UploadDate = f.UploadDate,
                DisplayName = f.DisplayName
            }).ToListAsync());
        }

        [HttpGet("{fileGuid}/{fileName?}")]
        public async Task<IActionResult> Get(Guid fileGuid)
        {
            var file = await _dbContext.Files.FindAsync(fileGuid);
            if (file == null)
                return NotFound();

            // Set up the content-disposition header with proper encoding of the filename
            var contentDisposition = new ContentDispositionHeaderValue("inline");
            contentDisposition.SetHttpFileName(MakeFileName(file.DisplayName));
            Response.Headers[HeaderNames.ContentDisposition] = contentDisposition.ToString();

            // Return the actual filestream
            MemoryStream ms = new MemoryStream(file.Content, false);
            return new FileStreamResult(ms, file.MimeType);
        }

        [HttpPost]
        [Authorize("CanModify")]
        public async Task<IActionResult> Post([FromBody] UploadFileDto newFile)
        {
            var model = new File
            {
                Content = newFile.Content,
                MimeType = newFile.MimeType,
                DisplayName = newFile.DisplayName,
                UploadDate = DateTimeOffset.UtcNow,
                ModifyDate = DateTimeOffset.UtcNow
            };

            _dbContext.Files.Add(model);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new {fileGuid = model.Id}, model.Id);
        }

        [HttpPut("{fileGuid}")]
        [Authorize("CanModify")]
        public async Task<IActionResult> Modify(Guid fileGuid, [FromBody] UploadFileDto changeData)
        {
            var file = await _dbContext.Files.FindAsync(fileGuid);
            if (file == null)
                return NotFound();

            file.DisplayName = changeData.DisplayName;
            if (changeData.Content != null && changeData.MimeType != null)
            {
                file.Content = changeData.Content;
                file.DisplayName = changeData.DisplayName;
            }

            _dbContext.Update(file);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("{fileGuid}")]
        [Authorize("CanModify")]
        public async Task<IActionResult> Delete(Guid fileGuid)
        {
            var file = await _dbContext.Files.FindAsync(fileGuid);
            if (file == null)
                return NotFound();

            _dbContext.Remove(file);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        private static string MakeFileName(string raw)
        {
            foreach (var c in System.IO.Path.GetInvalidFileNameChars())
            {
                raw = raw.Replace(c, '_');
            }

            return raw;
        }
    }
}