# E-commerce API Backend

This is the backend for a lightweight transactional system, built with Node.js, Express, PostgreSQL, and Sequelize. The entire application is containerized using Docker for easy setup and deployment.

---

## ✨ Features


### Core Features
- Product Catalog Management
- Customer Order Placement with inventory checks
- Daily Sales Reporting (Total Transactions, Revenue, Top 3 Products)

### Bonus Features Implemented
- **JWT Authentication**: Secure endpoints with role-based access for admins.
- **Order Status Tracking**: Orders have a `status` field (e.g., PENDING).
- **Dockerization**: The entire application and database are containerized for easy setup.
- **API Documentation**: Interactive API documentation available via Swagger.
---
## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JSON Web Tokens (JWT)
- **API Documentation**: Swagger
- **Containerization**: Docker, Docker Compose
## 🚀 Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) must be installed and running on your machine.

### Installation & Setup
1.  **Clone the repository:**
git clone https://github.com/himanshusingh9554/ecommerce.git
2.  **Navigate to the project directory:**
cd ecommerce-api
3.  **Build and run the application with Docker Compose:**
docker compose up --build
The server will be running at `http://localhost:3000`.

---

## 📖 API Documentation & Usage

- **Interactive API Documentation (Swagger)** is available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

- **Default Admin User**: The database is automatically seeded with a default admin user.
- **Email**: `admin@example.com`
- **Password**: `adminpassword`

You can use these credentials to log in via the API and get an admin token to test protected routes.


 Example API Usage
Below are a few examples of how to use the API.

1. Login as Admin
Use the default admin credentials to get an authorization token.

Request: POST /api/auth/login

JSON 

{
  "email": "admin@example.com",
  "password": "adminpassword"
}

RESPONSE

{
    "id": 1,
    "email": "admin@example.com",
    "role": "admin",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


E-commerce API Backend
This is the backend for a lightweight transactional system, built with Node.js, Express, PostgreSQL, and Sequelize. The entire application is containerized using Docker for easy setup and deployment.

✨ Features
Core Features
Product Catalog Management

Customer Order Placement with inventory checks

Daily Sales Reporting (Total Transactions, Revenue, Top 3 Products)

Bonus Features Implemented
JWT Authentication: Secure endpoints with role-based access for admins.

Order Status Tracking: Orders have a status field (e.g., PENDING).

Dockerization: The entire application and database are containerized for easy setup.

API Documentation: Interactive API documentation available via Swagger.

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Sequelize

Authentication: JSON Web Tokens (JWT)

API Documentation: Swagger

Containerization: Docker, Docker Compose

🚀 Getting Started
Prerequisites
Docker Desktop must be installed and running on your machine.

Installation & Setup
Clone the repository: https://github.com/himanshusingh9554/ecommerce.git

Bash

git clone https://github.com/himanshusingh9554/ecommerce.git
Navigate to the project directory:

Bash

cd ecommerce-api
Build and run the application with Docker Compose:

Bash

docker compose up --build
The server will be running at http://localhost:3000.

📖 API Documentation & Usage
Interactive API Documentation (Swagger) is available at: http://localhost:3000/api-docs

Default Admin User: The database is automatically seeded with a default admin user.

Email: admin@example.com

Password: adminpassword

You can use these credentials to log in via the API and get an admin token to test protected routes.

⚙️ Example API Usage

Below are a few examples of how to use the API.

1. Login as Admin
Use the default admin credentials to get an authorization token.

Request: POST /api/auth/login

JSON

{
  "email": "admin@example.com",
  "password": "adminpassword"
}


Response:

JSON

{
    "id": 1,
    "email": "admin@example.com",
    "role": "admin",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
(Copy the accessToken from the response to use in protected routes.)



2. Create a Product (Admin Only)
Request: POST /api/products
<br>
Header: Authorization: Bearer <your_admin_token>

Body: JSON

{
    "name": "Wireless Mouse",
    "price": "25.50",
    "category": "Electronics",
    "stock_quantity": 100
}

Response:

{
    "id": 3,
    "name": "Wireless Mouse",
    "price": "25.50",
    "category": "Electronics",
    "available": true,
    "stock_quantity": 100,
    "updatedAt": "2025-08-02T03:55:00.000Z",
    "createdAt": "2025-08-02T03:55:00.000Z"
}
