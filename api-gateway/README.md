# API Gateway

## Description
Central entry point for the microservices system. Handles JWT validation and request routing.

## Setup
1.  Install dependencies: `npm install`
2.  Configure `.env`.
3.  Start service: `npm start`

## Routes
-   `/auth/*` -> Auth Service
-   `/cars/*` -> Car Service
-   `/orders/*` -> Order Service
-   `/payment/*` -> Payment Service

## Authentication
-   Public: `/auth/register`, `/auth/login`, `GET /cars`
-   Protected: All other routes require `Authorization: Bearer <token>`
