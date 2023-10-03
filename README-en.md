# Event House Manager

  Backend of an application to manage an event house.

## Application Architecture Overview

![Application Architecture](./app-architecture.png)
<br></br>

## Requirements

- Git
- Docker

## Installation

Follow this step-by-step guide to test this repository.

Clone the repository to your local machine

```shell
$ git clone git@github.com:AllexThiagoSR/event-house-manager.git
```

Navigate to the folder

```shell
$ cd event-house-manager
```

Switch to the branch where the project is implemented if you're not already on it

```shell
$ git checkout main
```

## Start the Application

Launch the containers with Docker Compose

```shell
$ docker compose up -d --build
```

Check if the containers are running

```shell
$ docker ps
```

The output of the previous command should be something like this:

```shell
CONTAINER ID   IMAGE                     COMMAND                  CREATED       STATUS                 PORTS                                                  NAMES
0a4ee9dea1ca   event-house-manager-api   "npm run dev"            2 hours ago   Up About an hour       0.0.0.0:3001->3001/tcp, :::3001->3001/tcp              event_api
9577639df2b8   mysql:8.0.32              "docker-entrypoint.s…"   2 hours ago   Up 2 hours (healthy)   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   event_db
```

> If you don't have Docker, here's the installation documentation: [Docker Installation Guide](https://docs.docker.com/get-docker/)

## How to Use?

1. Make sure to follow all installation steps.

After the previous steps, the application will be accessible on port 3001 of your localhost. You can access it via the base link `http://localhost:3001`.

## Visualization of the Relationship Between Database Tables in Event House Manager

![Database Tables](./tables.png)

## Technologies Used

- TypeScript
  
- Docker
  
- Node.js
  
- Express
  
- MySQL
  
- Sequelize
  
- JWT

- BCrypt

- Nodemailer

# Application Endpoints

>Base URL: http://localhost:3001

## Login

### Request

`POST /login`

```shell
http://localhost:3001/login

body:
{
  "email": "user@gmail.com",
  "password": "123456789"
}
```

### Response

  Status 200 OK

```json
{
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}
```

## List All Events - Logged in as a User
  When logged in as a user, it retrieves information only about non-private events without details about registered users.

### Request

`GET /events`

```shell
http://localhost:3001/events

headers: {
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}
```

### Response

  Status 200 OK

```json
[
  {
    "id": 2,
    "description": "A public event to test",
    "date": "2023-10-11",
    "time": "18:00:00",
    "privateEvent": false,
    "ticketsQuantity": 1,
    "needTicket": true
  },
  {
    "id": 3,
    "description": "A public event to test 2",
    "date": "2023-10-11",
    "time": "18:00:00",
    "privateEvent": false,
    "ticketsQuantity": null,
    "needTicket": false
  }
]
```

## List All Events - Logged in as an Administrator

  When logged in as an administrator, the endpoint returns information about registered users or invited guests for the event.

### Request

`GET /events`

```shell
http://localhost:3001/events

headers: {
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}
```

### Response

Status 200 OK

```json
[
  {
    "id": 1,
    "description": "A private event to test",
    "date": "2023-10-11",
    "time": "18:00:00",
    "privateEvent": true,
    "ticketsQuantity": 1,
    "needTicket": true,
    "signedUsers": []
  },
  {
    "id": 2,
    "description": "A public event to test",
    "date": "2023-10-11",
    "time": "18:00:00",
    "privateEvent": false,
    "ticketsQuantity": 1,
    "needTicket": true,
    "signedUsers": []
  },
  {
    "id": 3,
    "description": "A public event to test 2",
    "date": "2023-10-11",
    "time": "18:00:00",
    "privateEvent": false,
    "ticketsQuantity": null,
    "needTicket": false,
    "signedUsers": []
  }
]
```

## List an Event by ID - Logged in as a User

  When logged in as a user, the endpoint does not return information about registered users or invited guests for the event, and users cannot list private events.

### Request

`GET /events/:id`

```shell
http://localhost:3001/events/2

headers: {
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}
```

### Response

Status 200 OK

```json
{
  "id": 2,
  "description": "A public event to test",
  "date": "2023-10-11",
  "time": "18:00:00",
  "privateEvent": false,
  "ticketsQuantity": 1,
  "needTicket": true
}
```

## List an Event by ID - Logged in as an Administrator

  When logged in as an administrator, the endpoint returns information about registered users or invited guests for the event.

### Request

`GET /events/:id`

```shell
http://localhost:3001/events/1

headers: {
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}
```

### Response

Status 200 OK

```json
{
  "id": 1,
  "description": "A private event to test",
  "date": "2023-10-11",
  "time": "18:00:00",
  "privateEvent": true,
  "ticketsQuantity": 1,
  "needTicket": true,
  "signedUsers": []
}
```

## Invite a User to an Event
  This endpoint can only be accessed by administrators, and it is only possible to invite users to private events.

### Request

`POST /events/:id/invite/:userId`

```shell
http://localhost:3001/events/1/invite/2

headers: {
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}
```

### Response

  Status 201 CREATED

```json
{
  "message": "User invited"
}
```

## Sign Up for an Event
  This endpoint can be accessed by any user, and it registers the logged-in user for the event with the specified ID. However, a user cannot sign up for a private event.

### Request

`POST /events/:id/sign`

```shell
http://localhost:3001/events/2/sign

headers: {
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}
```

### Response

  Status 200 OK

```json
{
  "message": "User signed"
}
```

## Create an Event
  This endpoint can only be accessed by administrators.

### Request

`POST /events`

```shell
http://localhost:3001/events

headers: {
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}

body: {
  "description": "An event to test the API",
  "date": "2023-10-11",
  "time": "18:00:00",
  "privateEvent": true,
  "ticketsQuantity": 30,
  "needTicket": true
}
```

### Response

  Status 201 CREATED

```json
{
  "id": 4,
  "description": "An event to test the API",
  "date": "2023-10-11",
  "time": "18:00:00",
  "privateEvent": true,
  "ticketsQuantity": 30,
  "needTicket": true
}
```

## Update Event Information
  This endpoint can only be accessed by administrators.

### Request

`PATCH /events/:id`

```shell
http://localhost:3001/events/3

headers: {
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}

body: {
  "description": "Updating this to test",
  "date": "2023-10-12",
  "time": "18:30:00"
}
```

### Response

Status 200 OK

```json
{
  "id": 3,
  "description": "Updating this to test",
  "date": "2023-10-12",
  "time": "18:30:00",
  "privateEvent": false,
  "ticketsQuantity": null,
  "needTicket": false,
  "signedUsers": [
    {
      "id": 1,
      "name": "ADM",
      "email": "allexthiagodev@gmail.com",
      "roleId": 1
    },
    {
      "id": 2,
      "name": "user",
      "email": "user@gmail.com",
      "roleId": 2
    }
  ]
}
```

## Delete Event Information
  This endpoint can only be accessed by administrators.

### Request

`DELETE /events/:id`

```shell
http://localhost:3001/events/3

headers: {
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}
```

### Response

  Status 204 NO CONTENT

## Create a User
  Endpoint to register a user.

### Request

`POST /users`

```shell
POST http://localhost:3001/users

body: {
  "name": "User Name",
  "email": "user@gmail.com",
  "password": "123456789"
}
```

### Response

  Status 201 CREATED

```json
{
  "id": 3,
  "name": "User Name",
  "email": "user@gmail.com",
  "roleId": 2
}
```

## Update Logged-in User Information
  This endpoint only allows the update of the logged-in user.

### Request

`PATCH /users`

```shell
http://localhost:3001/users

headers: {
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}

body: {
  "name": "New User Name",
  "email": "newuser@gmail.com"
}
```

### Response

  Status 200 OK

```json
{
  "id": 3,
  "name": "New User Name",
  "email": "newuser@gmail.com",
  "roleId": 2
}
```

## Delete Logged-in User Information
  This endpoint only allows the deletion of the logged-in user.

### Request

`DELETE /users`

```shell
http://localhost:3001/users

headers: {
  "Authorization": "your-auth-token-here"
}
```

### Response

  Status 204 NO CONTENT
