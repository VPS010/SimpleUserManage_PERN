# User Management Web App (PERN)

This is a simple User Management Web Application built using the PERN stack (PostgreSQL, Express, React, Node.js). The project was built while learning CRUD operations with Prisma and PostgreSQL.

## Setup and Run Locally

To run this app locally, you will need Docker and Docker Compose installed.

### 1. Clone the repository:

```bash
git clone https://github.com/VPS010/SimpleUserManage_PERN.git
cd userManagement
docker-compose up -d
docker exec -it backend npx prisma migrate dev --name init
```
### 1. To stop the application:
```bash
docker-compose down
```

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Containerization**: Docker & Docker Compose

## Features

- Basic CRUD operations for user management
- Postgres database integration with Prisma ORM




