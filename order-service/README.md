# Order Service

## Description
Manages customer orders.

## Setup
1.  Install dependencies: `npm install`
2.  Configure `.env`.
3.  Start service: `npm start`

## API Endpoints
-   `POST /orders`: Create a new order.
-   `GET /orders/user/:userId`: Get orders for a user.
-   `GET /orders/:id`: Get order details.
-   `PATCH /orders/:id/status`: Update order status.
