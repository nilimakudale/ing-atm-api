# REST api to CRUD ING ATMs


Application Features:

* Create the ING's ATM
* Update the existing ATM
* Delete the ATM record
* List all ATM records

## How to build and deploy application

Command to build application:

```text
npm run gcp:build  
```

Command to deploy application:

```text
npm run deploy  
```

### Technology stack

* NodeJs
* NestJs
* PostgreSQL

## Flow 

Sign Up/ create new user by auth/signup api - with request data :
{
    "email":"",
    "password":"",
    "name":""
}
 in response will get access token to access other APIs.

Login by auth/login api - with request data :
{
    "username":"",
    "password":"",
}
 in response will get access token to access other APIs.


## Swagger

Where to find specification src/main/webapp/specs [http://localhost:8080/atm-locator/specs/swagger.json](http://localhost:8080/atm-locator/specs/swagger.json)

## Swagger UI

http://localhost:8080/atm-locator/swagger-ui/
