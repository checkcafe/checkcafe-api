# CheckCafe API

**Hono-Auth** is a simple authentication boilerplate built with Hono.js using Bun and TypeScript, designed to provide essential auth functionality. This project includes four key authentication endpoints and leverages Prisma ORM for database management, Zod for validation, and Swagger UI for API documentation.

## Features

- User Authentication: Includes user registration, login, logout, and token refresh.
- Zod Validation: Schema validation for secure data handling.
- Swagger UI: Auto-generated API docs for easy testing and integration.
- Dynamic Role Access Control: Enhanced role management allowing for flexible access control based on user roles and hierarchy.
- Role Hierarchy Filtering: Implemented filtering logic to ensure only appropriate roles are included in access checks, improving security and clarity.

## Tech Stack (Framework & Libraries)

- Language: TypeScript
- Runtime: Bun
- Framework: Hono
- ORM: Prisma
- Database: PostgreSQL
- REST API: OpenAPI, Swagger, Scalar
- Data Validation: Zod

## Endpoints

| Endpoint            | Method | Description          |
| ------------------- | ------ | -------------------- |
| /auth/register      | POST   | Register a new user  |
| /auth/login         | POST   | Log in a user        |
| /auth/refresh-token | POST   | Refresh access token |
| /auth/logout        | POST   | Log out a user       |
| /auth/me            | GET    | Get user information |

## ERD

![ERD](erd.png)

## Setup and Usage

### Clone the repository and install dependencies:

```sh
git clone https://github.com/checkcafe-api/checkcafe-api.git
cd checkcafe-api
bun install
```

### Create a `.env` file in the root directory

```sh
cp .env.example .env
# edit .env with your own values
```

### Migrate and seed the database

```sh
bun migrate
bun seed
```

### Start the server

```sh
bun dev
# Open http://localhost:3000/ui in your browser
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more information.
