# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS build
WORKDIR /app

COPY . .
WORKDIR /app/IdentityManagerAPI
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine
WORKDIR /app

COPY --from=build /app/publish .
RUN mkdir Images

EXPOSE 8080

ENTRYPOINT ["dotnet", "IdentityManagerAPI.dll"]
