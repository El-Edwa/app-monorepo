# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS build
WORKDIR /app

# Copy the solution/project files and restore dependencies
COPY . .
WORKDIR /app/IdentityManagerAPI
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS runtime
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/publish .
RUN mkdir Images

# Expose the port
EXPOSE 5025

# Set the entry point to run the application
ENTRYPOINT ["dotnet", "IdentityManagerAPI.dll"]
