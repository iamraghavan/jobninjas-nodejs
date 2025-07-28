# JobNinjas Backend API

This is the backend API for the JobNinjas application, built with Node.js and the Express framework.


## Features

The API provides endpoints for the following modules:

- **Authentication:** User registration and login, including standard email/password and Google authentication.
- **Admin Authentication:** Admin login with email/password and OTP (One-Time Password) verification, and Google authentication for admins.
- **Users:** Management of user profiles and data.
- **Job Listings:** Functionality for creating, reading, updating, and deleting job listings.
- **Mock Tests:** Endpoints related to mock tests.
- **Study Materials:** Endpoints for accessing study materials.
- **Notifications:** Handling user notifications.
- **Blogs:** Managing blog posts.
- **Static Pages:** Endpoints for static content.


## Technology Stack

- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens) + bcrypt (for password hashing)
- **Authorization:** Role-based access control (RBAC) via custom middleware logic
- **API Documentation:** Swagger (OpenAPI 3.0)
- **Environment Configuration:** dotenv
- **Security:** helmet, cors, express-rate-limit
- **Email Sending:** Configured for OTP functionality


## Project Structure

The project follows a modular structure with separation of concerns:

    .
    ├── controllers        # Contains the logic for handling requests
    ├── models             # Defines the database schemas using Sequelize
    ├── routes             # Defines the API endpoints and links them to controllers
    ├── middleware         # Contains custom middleware for authentication, authorization, etc.
    ├── docs               # API documentation files
    ├── config             # Database and other configuration
    ├── .env               # Environment variables (sensitive information)
    ├── .gitignore         # Specifies intentionally untracked files that Git should ignore
    ├── app.js             # Main application entry point
    ├── package.json       # Project dependencies and scripts
    ├── package-lock.json  # Locks dependency versions
    └── README.md          # Project overview and documentation


## Getting Started

### Prerequisites

- Node.js (v18.x or higher recommended)
- npm (Node Package Manager)
- MySQL Database


### Installation

1. Clone the repository:

```bash
git clone https://github.com/iamraghavan/jobninjas-nodejs.git
cd jobninjas-nodejs
```

2. Install dependencies:

```bash
npm install
```


### Configuration

1. Create a `.env` file in the root of your project.
2. Add the necessary environment variables (ensure to replace placeholder values with actual credentials):

<!---->

    PORT=3000
    JWT_SECRET=your_super_secret_jwt_key
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    MAIL_MAILER=smtp
    MAIL_HOST=smtp.gmail.com
    MAIL_PORT=465
    MAIL_USERNAME=your_email_username
    MAIL_PASSWORD=your_email_password
    MAIL_ENCRYPTION=ssl
    MAIL_FROM_ADDRESS=your_sending_email_address

3. **Important:** Ensure your MySQL database is running and accessible from where you are running the application.


### Database Setup

This project uses Sequelize, but the database schema is currently managed manually.

1. Connect to your MySQL database using a client like phpMyAdmin, MySQL Workbench, or the command-line client.
2. Execute the following SQL statements to create the necessary tables:

```sql
-- Create the Users table
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  googleId VARCHAR(255),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- Create the Admins table
CREATE TABLE Admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  googleId VARCHAR(255),
  otp VARCHAR(255),
  otpExpires DATETIME,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```


### Running the Application

- **Development Mode (with nodemon):**

```bash
npm run dev
```

- **Production Mode:**

```bash
npm start
```

The server should start and listen on the port specified in your `.env` file (default is 3000).


## API Documentation (Swagger)

The API documentation is available using Swagger UI. Once your application is running, you can access the documentation at:

    YOUR_APP_URL/api-docs

Replace `YOUR_APP_URL` with the base URL of your running application (e.g., `http://localhost:3000`).

The Swagger documentation provides details about the available endpoints, request/response formats, and allows you to test the API directly from the browser.


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a pull request.


## License

This project is licensed under the Apache-2.0 License.
