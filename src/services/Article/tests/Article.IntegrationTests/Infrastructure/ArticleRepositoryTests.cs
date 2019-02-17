using System;
using System.Linq;
using System.Threading.Tasks;
using MarcellTothNet.Services.Article.Domain.ArticleAggregate;
using MarcellTothNet.Services.Article.Domain.TagAggregate;
using MarcellTothNet.Services.Article.Infrastructure;
using MarcellTothNet.Services.Article.Infrastructure.PersistenceModels;
using MarcellTothNet.Services.Article.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace MarcellTothNet.Services.Article.IntegrationTests.Infrastructure
{
    public class ArticleRepositoryTests
    {
        private static DbContextOptions<ArticleContext> CreateNewContextOptions()
        {
            // Create a fresh service provider, and therefore a fresh 
            // InMemory database instance.
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            // Create a new options instance telling the context to use an
            // InMemory database and the new service provider.
            var builder = new DbContextOptionsBuilder<ArticleContext>();
            builder.UseInMemoryDatabase("ArticleDatabase")
                .UseInternalServiceProvider(serviceProvider);

            return builder.Options;
        }

        //  Create a new isolated database for every test.

        private readonly DbContextOptions<ArticleContext> _dbContextOptions = CreateNewContextOptions();

        private ArticleContext CreateDbContext()
        {
            return new ArticleContext(_dbContextOptions);
        }


        // Create a test article

        private static readonly string _testArticleTitle = "Test article";
        private static readonly string _testImageLocation = "relative-uri.png";
        private static readonly string _testImageAltText = "image-alt-text";
        private static string _testContent = "Test Content";
        private static readonly ImageReference _testImageReference = new ImageReference(_testImageLocation, _testImageAltText);
        private static readonly int[] _testTagIds = { 2, 3 };
        private static readonly DateTimeOffset _testPublishTime = DateTimeOffset.FromUnixTimeSeconds(10240);

        private readonly Domain.ArticleAggregate.Article _testArticle = new Domain.ArticleAggregate.Article(_testArticleTitle, _testPublishTime, _testContent, _testImageReference, _testTagIds, true);

        private void AddTestArticleToDb()
        {
            using (ArticleContext context = CreateDbContext())
            {
                ArticleModel am = new ArticleModel()
                {
                    Id = 1,
                    Title = _testArticleTitle,
                    Content = _testContent,
                    PublishTime = _testPublishTime,
                    Thumbnail = new ImageReferenceModel()
                    {
                        AltText = _testImageAltText,
                        Location = _testImageLocation
                    }
                };
                Tag testTag2 = new Tag("Test Tag 2")
                {
                    Id = 2
                };

                Tag testTag3 = new Tag("Test Tag 3")
                {
                    Id = 3
                };
                context.Tags.Add(testTag2);
                context.Tags.Add(testTag3);
                am.ArticleTags.Add(new ArticleTagModel()
                {
                    Article = am,
                    Tag = testTag2
                });
                am.ArticleTags.Add(new ArticleTagModel()
                {
                    Article = am,
                    Tag = testTag3
                });
                context.ArticleModels.Add(am);
                context.SaveChanges();
            }
        }

        /// <summary>
        ///     Tests if adding the test article to the database context finishes successfully.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Add_TestArticle_MapsCorrectly()
        {
            var domainObject = _testArticle;

            using (var articleContext = CreateDbContext())
            {
                ArticleRepository repo = new ArticleRepository(articleContext);
                repo.Add(domainObject);
                await articleContext.SaveChangesAsync();
            }

            using (var assertContext = CreateDbContext())
            {
                ArticleModel storedModel = await assertContext.ArticleModels.Include(a => a.ArticleTags).FirstOrDefaultAsync(a => a.Id == _testArticle.Id);
                Assert.NotNull(storedModel);
                Assert.Equal(_testArticleTitle, storedModel.Title);
                Assert.Equal(_testContent, storedModel.Content);
                Assert.Equal(_testPublishTime, storedModel.PublishTime);
                Assert.Equal(_testTagIds, storedModel.ArticleTags.Select(at => at.TagId));
                Assert.Equal(_testImageLocation, storedModel.Thumbnail.Location);
                Assert.Equal(_testImageAltText, storedModel.Thumbnail.AltText);
            }
        }

        [Fact]
        public async Task GetById_Nonexistent_ReturnsNull()
        {
            using (var articleContext = CreateDbContext())
            {
                ArticleRepository repo = new ArticleRepository(articleContext);
                
                Assert.Null(await repo.GetByIdAsync(319));
            }
        }

        [Fact]
        public async Task GetById_TestArticle_LoadsCorrectly()
        {
            AddTestArticleToDb();

            using (ArticleContext actContext = CreateDbContext())
            {
                ArticleRepository repo = new ArticleRepository(actContext);

                Domain.ArticleAggregate.Article domainModel = await repo.GetByIdAsync(1);

                Assert.NotNull(domainModel);
                Assert.Equal(1, domainModel.Id);
                Assert.Equal(_testArticleTitle, domainModel.Title);
                Assert.Equal(domainModel.Content, _testContent);
                Assert.Equal(_testPublishTime, domainModel.PublishTime);
                Assert.Equal(_testImageLocation, domainModel.Thumbnail.Location);
                Assert.Equal(_testImageAltText, domainModel.Thumbnail.AltText);
                Assert.Equal(_testTagIds, domainModel.TagIds);

            }
        }

        [Fact]
        public async Task Delete_TestArticle_Deletes()
        {
            AddTestArticleToDb();

            using (ArticleContext actContext = CreateDbContext())
            {
                ArticleRepository repo = new ArticleRepository(actContext);

                repo.Delete(1);

                await actContext.SaveEntitiesAsync();
            }

            using (ArticleContext assertContext = CreateDbContext())
            {
                Assert.Empty(assertContext.ArticleModels);
            }
        }

        [Fact]
        public async Task Update_TestArticle_UpdatesThumbnail()
        {
            AddTestArticleToDb();

            using (ArticleContext actContext = CreateDbContext())
            {
                ArticleRepository repo = new ArticleRepository(actContext);

                var testArticle = await repo.GetByIdAsync(1);
                testArticle.Thumbnail = new ImageReference(_testImageLocation, "NewAltText");
                repo.Update(testArticle);

                await actContext.SaveEntitiesAsync();
            }

            using (ArticleContext assertContext = CreateDbContext())
            {
                ArticleModel testModel = await assertContext.ArticleModels.FirstOrDefaultAsync();

                Assert.NotNull(testModel);

                Assert.Equal("NewAltText", testModel.Thumbnail.AltText);
            }
        }

        [Fact]
        public async Task Update_TestArticle_UpdatesTags()
        {
            AddTestArticleToDb();

            using (ArticleContext actContext = CreateDbContext())
            {
                ArticleRepository repo = new ArticleRepository(actContext);

                var testArticle = await repo.GetByIdAsync(1);
                testArticle.ReplaceTagIds(new []{3,4});
                repo.Update(testArticle);

                await actContext.SaveEntitiesAsync();
            }

            using (ArticleContext assertContext = CreateDbContext())
            {
                ArticleModel testModel = await assertContext.ArticleModels.FirstOrDefaultAsync();
                assertContext.Entry(testModel).Navigation("ArticleTags").Load();

                Assert.NotNull(testModel);

                Assert.Equal(new[]{3,4}, testModel.ArticleTags.Select(at => at.TagId).OrderBy(i => i));
            }
        }
    }
}