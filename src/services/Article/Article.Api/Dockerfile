FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["src/services/Article/Article.Api/Article.Api.csproj", "src/services/Article/Article.Api/"]
RUN dotnet restore "src/services/Article/Article.Api/Article.Api.csproj"
COPY . .
WORKDIR "/src/src/services/Article/Article.Api"
RUN dotnet build "Article.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Article.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Article.Api.dll"]