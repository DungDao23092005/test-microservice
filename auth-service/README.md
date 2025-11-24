# Auth Service

## Description
Handles user registration, login, and JWT authentication.

## Setup
1.  Install dependencies: `npm install`
2.  Configure `.env` (see `.env.example` or create one based on requirements).
3.  Start service: `npm start`

## API Endpoints
-   `POST /register`: Register a new user.
-   `POST /login`: Login and get JWT.
-   `GET /profile`: Get current user profile (Requires JWT).
