# Hotel Booking System POC

## Application

:warning: This application is intended to be used as a POC and run locally only. It is __NOT__ Production ready!

Application consists of these components:
- Frontend Angular application
- Backend ASP.NET API
- Keycloak Identity and Access Management Solution
- Nginx reverse proxy as Gateway

Application has two predefined roles:
- Customers (`customer`)
- Employees (`employee`)

Application hase these predefined users:
- Customer1 (role `customer`)
  - Login: `customer1`
  - Passwd: `customer1`
- Customer2 (role `customer`)
  - Login: `customer2`
  - Passwd: `customer2`
- Employee1 (role `employee`)
  - Login: `employee1`
  - Passwd: `employee1`

## How to run the application

It is recommended to run the application using Docker Compose. When run, Docker Compose will build both Frontend and Backend applications and start all required services.

To start the application with Docker Compose run following command _(in the project root directory)_:
```shell
docker compose up -d --build
```
_This command will automatically (re)build all required images._

### Accessing the application

After running Docker Compose, the application can be accessed here: http://localhost:8080

Application Swagger specification can be accessed here: http://localhost:8080/api/swagger

Keycloak Administration Console can be accessed here: http://localhost:8080/auth/admin
- Login: `admin`
- Passwd: `admin`

### Stopping the application

To stop the application and remove containers run the following command _(in the project root directory)_:
```shell
docker compose down
```