using System.Net;
using MarcellTothNet.Services.Article.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MarcellTothNet.Services.Article.Api.Infrastructure.Filters
{
    /// <summary>
    ///     Exception filter that handles domain validation exceptions and output them in a nice human and machine readable form.
    /// </summary>
    public class DomainExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            // We only handle domain exceptions
            if (context.Exception is ArticleDomainException)
            {
                // Put the error into an object and send it back to the client.

                var problemDetails = new ValidationProblemDetails()
                {
                    Instance = context.HttpContext.Request.Path,
                    Status = StatusCodes.Status400BadRequest,
                    Detail = "Please refer to the errors property for additional details."
                };

                problemDetails.Errors.Add("DomainValidations", new[] { context.Exception.Message });

                context.Result = new BadRequestObjectResult(problemDetails);
                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                // Let the framework know that we handled the eception
                context.ExceptionHandled = true;
            }
        }
    }
}