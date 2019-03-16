using System;
using System.Net.Http;

namespace SpaAggregator.Infrastructure.Exceptions
{
    public class DownstreamConnectionException : Exception
    {
        public HttpResponseMessage ResponseMessage { get; }

        public DownstreamConnectionException(string message) : base(message)
        {}

        public DownstreamConnectionException(string message, HttpResponseMessage responseMessage) : base(message)
        {
            ResponseMessage = responseMessage;
        }
    }
}