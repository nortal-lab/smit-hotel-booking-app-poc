FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

COPY *.sln .
COPY HotelBookingSystem/*.csproj ./HotelBookingSystem/
COPY ApiTests/*.csproj ./ApiTests/

RUN dotnet restore

COPY HotelBookingSystem/. ./HotelBookingSystem/

RUN dotnet test
RUN dotnet publish -c release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "API.dll"]
