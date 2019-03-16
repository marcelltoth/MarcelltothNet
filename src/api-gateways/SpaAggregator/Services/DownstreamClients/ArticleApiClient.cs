using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SpaAggregator.Infrastructure.Exceptions;
using SpaAggregator.Models;

namespace SpaAggregator.Services.DownstreamClients
{
    public class ArticleApiClient
    {
        private readonly HttpClient _httpClient;

        public ArticleApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Article>> GetAllArticles()
        {
            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync("articles");
                if (!response.IsSuccessStatusCode)
                {
                    throw new DownstreamConnectionException("Non success code received from downstream server", response);
                }

                return JsonConvert.DeserializeObject<Article[]>(await response.Content.ReadAsStringAsync());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<IEnumerable<Tag>> GetAllTags()
        {
            HttpResponseMessage response = await _httpClient.GetAsync("tags");
            if (!response.IsSuccessStatusCode)
            {
                throw new DownstreamConnectionException("Non success code received from downstream server", response);
            }

            return JsonConvert.DeserializeObject<Tag[]>(await response.Content.ReadAsStringAsync());
        }


        public async Task<Article> GetArticleDetails(int articleId)
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"articles/{articleId}");
            if (!response.IsSuccessStatusCode)
            {
                throw new DownstreamConnectionException("Non success code received from downstream server", response);
            }

            return JsonConvert.DeserializeObject<Article>(await response.Content.ReadAsStringAsync());
        }
    }
}