FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src
COPY src/services/Files/Files.Api/Files.Api.csproj ./services/Files/Files.Api/
COPY src/common/WebHostConfiguration/WebHostConfiguration.csproj ./common/WebHostConfiguration/
RUN dotnet restore ./services/Files/Files.Api/Files.Api.csproj
COPY src .
WORKDIR /src/services/Files/Files.Api
RUN dotnet build Files.Api.csproj -c Release -o /app --no-restore

FROM build AS publish
RUN dotnet publish Files.Api.csproj -c Release -o /app --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Files.Api.dll"]
