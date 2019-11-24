
# Table Creation In DB

1. Create database todo in your local mysql
2. Create Table todos with `id,title, description, uid` columns.
3. Create Table users with `id, name, email, password` columns.
4. Give your database credentials in "database.js" file

# How to start
### After downloading or cloning the code, Please create table as per above and follow below commans

1. npm install 
2. node app.js

# API Usage 

1. signup route - `http://localhost:9890/api/signup`
     * pass json object contain email, name, password.
2. login route - `http://localhost:9890/api/login`
     * pass json object contain email and password.
3. other crud route are in secureApi -  `localhost:9890/secureApi/todo`.
     * In all GET, PUT, DELETE and POST request pass `token` in header which you get in login response.

Example object for login request (body as JSON object) -

```
{
    "email":"test",
    "password":"testpass"
}
```
For Other Crud request - 

```
{
  "title": "Todo1",
  "Description:"This is for tommorow"
}

```
Note: You have to pass `token` for each request as header which youi will get in login response.






