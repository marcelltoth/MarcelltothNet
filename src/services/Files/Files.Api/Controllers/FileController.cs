using System;
using System.Linq;
using System.Threading.Tasks;
using MarcellTothNet.Services.Files.Api.Contract;
using MarcellTothNet.Services.Files.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                UploadDate = f.UploadDate
            }).ToListAsync());
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
        [Authorize("CanModify")]
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
    }
}