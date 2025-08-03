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
Clone the repository:

Bash

git clone https://github.com/himanshusingh9554/ecommerce.git
Navigate to the project directory:

Bash

cd ecommerce
(Note: If you named the folder something else, cd into that folder.)

Create the Environment File:
Create a file named .env in the root directory and paste the following line into it. This is required for creating secure login tokens.

**JWT_SECRET=this_is_a_very_secret_key_and_should_be_long**


Build and run the application:

Bash

docker compose up --build
The server will start and be available at http://localhost:3000.

**Seeding the Database (Important for Testing)**
To create the default admin user and sample products, you need to run the database seeder.

Make sure the application is running (after docker compose up).

Open a new terminal window.

Run the following command:

Bash

**docker compose exec app npx sequelize-cli db:seed:all**

Running Natively (Without Docker)
Prerequisites:

Node.js (v18 or later)

PostgreSQL installed and running.

Instructions:

Clone and install dependencies:

Bash

git clone https://github.com/himanshusingh9554/ecommerce.git
cd ecommerce
npm install
Create the Database:
Make sure your PostgreSQL server is running. Open a SQL shell (psql) and create the database.

SQL

CREATE DATABASE ecommerce;
Create the Environment File:
Create a file named .env in the root directory. You must update the user and password to match your local PostgreSQL setup.

# JWT Secret
JWT_SECRET=this_is_a_very_secret_key_and_should_be_long

# Database Connection
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_local_postgres_password
DB_NAME=ecommerce
Seed the Database (for Testing):
Run the seeder command to populate the database with a default admin user and products.

Bash

npx sequelize-cli db:seed:all
Start the Server:

Bash

npm start
The server will start at http://localhost:3000.

📖 API Documentation & Usage
Interactive API Documentation (Swagger) is available at: http://localhost:3000/api-docs

Default Admin User: After running the seeder, you can log in with:

Email: admin@example.com

Password: adminpassword

⚙️ Example API Usage
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

Body:

JSON

{
    "name": "Wireless Mouse",
    "price": "25.50",
    "category": "Electronics",
    "stock_quantity": 100
}
Response:

JSON

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
