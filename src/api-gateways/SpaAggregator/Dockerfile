FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY rootca.pem .
SHELL ["powershell", "-Command", "Import-Certificate -CertStoreLocation cert:\\LocalMachine\\Root -Filepath \"C:\\App\\rootca.pem\""]

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src/api-gateways/SpaAggregator
COPY src/api-gateways/SpaAggregator/SpaAggregator.csproj .
RUN dotnet restore SpaAggregator.csproj
COPY src/api-gateways/SpaAggregator/ .
RUN dotnet build SpaAggregator.csproj -c Release -o /app --no-restore

FROM build AS publish
RUN dotnet publish SpaAggregator.csproj -c Release -o /app --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "SpaAggregator.dll"]
