# Event House Manager

  Backend de uma aplicação para gerenciar uma casa de eventos. 

## Esboço da arquitetura da aplicação

<img width="100%" align="center" src="./app-architecture.png" />
<br></br>

## Requerimentos

- Git
- Docker

## Instalação

Siga este passo a passo para testar este repositório.

Clone o repositório para sua máquina local

```
$ git clone git@github.com:AllexThiagoSR/event-house-manager.git
```

Acesse a pasta

```
$ cd event-house-manager
```

Acesse a branch onde o projeto está implementado se não estiver nela

```
$ git checkout main
```

## Iniciar a aplicação

Inicie os containers com o Docker Compose

```
$ docker compose up -d --build
```

Confira se os containers estão rodando

```
$ docker ps
```

O retorno do comando anterior deve mais ou menos o seguinte:

```
CONTAINER ID   IMAGE                     COMMAND                  CREATED       STATUS                 PORTS                                                  NAMES
0a4ee9dea1ca   event-house-manager-api   "npm run dev"            2 hours ago   Up About an hour       0.0.0.0:3001->3001/tcp, :::3001->3001/tcp              event_api
9577639df2b8   mysql:8.0.32              "docker-entrypoint.s…"   2 hours ago   Up 2 hours (healthy)   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   event_db
```

> Caso não tenha o docker, segue documentação para instalação: https://docs.docker.com/get-docker/

## Como utilizar?

1. Cetifique-se de seguir todos os passos de instalação.

Após os passos anteriores a aplicação estará exposta na porta 3001 do localhost. É possível acessar atráves do link base `http://localhost:3001`.

## Visualização do relacionamento entre as tabelas do banco de dados do Event House Manager

  <img width="100%" align="center" src="./tables.png" />
  <br></br>

## Tecnologias utilizadas

- TypeScript

- Docker

- Node.js

- Express

- MySQL

- Sequelize

- JWT

- BCrypt

- Nodemailer

# Endpoints da aplicação

>Url base: http://localhost:3001


## Fazer login

### Requisição

`POST /login`

    http://localhost:3001/login

    body:
    {
      "email": "user@gmail.com",
      "password": "123456789"
    }

### Resposta
  Status 200 OK
    
```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
}
```


## Listar todos os eventos - Logado como um usuário
  Quando logado como usuário traz informações apenas sobre os eventos não privados, sem informações sobre os usuários inscritos.

### Requisição

`GET /events`

    http://localhost:3001/events

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

### Resposta

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


## Listar todos os eventos - Logado como administrador
  Quando logado como um administrador o end-point retorna informações sobre os usuários inscritos ou convidados para o evento.

### Requisição

`GET /events`

    http://localhost:3001/events

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

### Resposta
  
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


## Listar um evento pelo id - Logado como usuário
  Quando logado como um usuário o end-point não retorna informações sobre os usuários inscritos ou convidados para o evento, e usuários não conseguem listar eventos que são privados.

### Requisição

`GET /events/:id`

    http://localhost:3001/events/2

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

### Resposta
  
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


## Listar um evento pelo id - Logado como administrador
  Quando logado como um administrador o end-point retorna informações sobre os usuários inscritos ou convidados para o evento.

### Requisição

`GET /events/:id`

    http://localhost:3001/events/1

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

### Resposta
  
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


## Convidar um usuário para um evento
  Esse end-point só pode ser acessado por administradores, e só é possivel convidar usuários para eventos que são privados.

### Requisição

`POST /events/:id/invite/:userId`

    http://localhost:3001/events/1/invite/2

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

### Resposta
  
  Status 201 CREATED
    
```json
{
  "message": "User invited"
}
```


## Inscrever-se em um evento
  Esse end-point pode ser acessado por qualquer usuário, e inscreve o usuário logado no evento com id informado, mas não é possivel um usuário se inscrever um evento que é privado.

### Requisição

`POST /events/:id/sign`

    http://localhost:3001/events/2/sign

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

### Resposta
  
  Status 200 OK
  
```json
{
  "message": "User signed"
}
```


## Criar um evento
  Esse end-point só pode ser acessado por administradores.

### Requisição

`POST /events`

    http://localhost:3001/events

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

    body: {
      "description": "A event to test the API",
      "date": "2023-10-11",
      "time": "18:00:00",
      "privateEvent": true,
      "ticketsQuantity": 30,
      "needTicket": true
    }

### Resposta
  
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

## Atualizar informações de um evento
  Esse end-point só pode ser acessado por administradores.

### Requisição

`PATCH /events/:id`

    http://localhost:3001/events/3

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

    body: {
      "description": "Updating this to test",
      "date": "2023-10-12",
      "time": "18:30:00"
    }

### Resposta
  
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


## Deletar informações de um evento
  Esse end-point só pode ser acessado por administradores.

### Requisição

`DELETE /events/:id`

    http://localhost:3001/events/3

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

### Resposta
  
  Status 204 NO CONTENT


## Criar um usuário
  End-point para cadastrar um usuário

### Requisição

`POST /users`

    http://localhost:3001/users

    body: {
      "name": "User Name",
      "email": "user@gmail.com",
      "password": "123456789"
    }

### Resposta
  
  Status 201 CREATED

```json
{
  "id": 3,
  "name": "User Name",
  "email": "user@gmail.com",
  "roleId": 2
}
```


## Atualizar informações do usuário logado
  Esse end-point só permite a atualização do usuário logado.

### Requisição

`PATCH /users`

    http://localhost:3001/users

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

    body: {
      "name": "New User Name",
      "email": "newuser@gmail.com"
    }

### Resposta
  
  Status 200 OK

```json
{
  "id": 3,
  "name": "New User Name",
  "email": "newuser@gmail.com",
  "roleId": 2
}
```


## Deletar informações do usuário logado
  Esse end-point só permite a deleção do usuário logado.

### Requisição

`DELETE /users`

    http://localhost:3001/users

    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIiLCJyb2xlSWQiOjIsImlhdCI6MTY5MTE4MDM5MCwiZXhwIjoxNjkxNzg1MTkwfQ.DUtJDJcos8X9c8P9nwoRuX9FBbRPK53QtNA6c2nx6M8"
    }

### Resposta
  
  Status 204 NO CONTENT
