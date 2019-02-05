FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY src/services/Identity/Identity.Api/Identity.Api.csproj src/services/Identity/Identity.Api/
RUN dotnet restore src/services/Identity/Identity.Api/Identity.Api.csproj
COPY . .
WORKDIR /src/src/services/Identity/Identity.Api
RUN dotnet build Identity.Api.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Identity.Api.csproj -c Release -o /appdoc

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Identity.Api.dll"]
