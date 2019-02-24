FROM microsoft/dotnet:2.2-aspnetcore-runtime-nanoserver-1803 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk-nanoserver-1803 AS build
WORKDIR /src/api-gateways/SpaAggregator
COPY src/api-gateways/SpaAggregator/SpaAggregator.csproj .
RUN dotnet restore SpaAggregator.csproj
COPY src/api-gateways/SpaAggregator/ .
RUN dotnet build SpaAggregator.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish SpaAggregator.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "SpaAggregator.dll"]
