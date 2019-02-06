FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src/api-gateways/AdminGateway/
COPY src/api-gateways/AdminGateway/AdminGateway.csproj .
RUN dotnet restore AdminGateway.csproj
COPY src/api-gateways/AdminGateway/ .
RUN dotnet build AdminGateway.csproj -c Release -o /app --no-restore

FROM build AS publish
RUN dotnet publish AdminGateway.csproj -c Release -o /app --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "AdminGateway.dll"]
