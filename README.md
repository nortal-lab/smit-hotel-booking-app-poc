# SMIT Hotel Booking App POC

## Application

:warning: This application is intended to be used as a Proof of Concept and run locally only. It is __NOT__ Production ready!

Application consists of these components:
- Frontend Angular application
- Backend ASP.NET API
- Keycloak Identity and Access Management Solution
- Nginx reverse proxy as Gateway

Application has two predefined roles:
- Customers (`customer`)
- Employees (`employee`)

Application has these predefined users:
- Customers (role `customer`):
  - Julie Delphy, 6873911223, julie.deplhy@yahoo.com
    - Login: `customer1`
    - Passwd: `customer1`
  - Arthur Li, 4652212312, arthurLi12@gmail.com
    - Login: `customer2`
    - Passwd: `customer2`
  - Bill Karey, 6839214231, bill.karey@gmail.com
    - Login: `customer3`
    - Passwd: `customer3`
- Employees (role `employee`):
  - Martin Einnberg, martin.einnberg@hotel.com
    - Login: `employee1`
    - Passwd: `employee1`
  - Susie Lamb, susie.lamb@hotel.com
    - Login: `employee2`
    - Passwd: `employee2`

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