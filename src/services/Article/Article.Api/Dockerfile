FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY src/services/Article/Article.Api/Article.Api.csproj ./services/Article/Article.Api/
COPY src/services/Article/Article.Infrastructure/Article.Infrastructure.csproj ./services/Article/Article.Infrastructure/
COPY src/services/Article/Article.Domain/Article.Domain.csproj ./services/Article/Article.Domain/
COPY src/common/DDDFoundations/DDDFoundations.csproj ./common/DDDFoundations/
COPY src/common/WebHostConfiguration/WebHostConfiguration.csproj ./common/WebHostConfiguration/
RUN dotnet restore ./services/Article/Article.Api/Article.Api.csproj
COPY . .
WORKDIR /src/services/Article/Article.Api
RUN dotnet build Article.Api.csproj -c Release -o /app --no-restore

FROM build AS publish
RUN dotnet publish Article.Api.csproj -c Release -o /app --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Article.Api.dll"]
