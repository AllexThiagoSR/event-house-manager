# Event House Manager

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

