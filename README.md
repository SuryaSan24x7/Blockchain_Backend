# Crypto Transaction Server

This repository contains the source code for a server-side application that fetches crypto transactions of a user and Ethereum price, as well as provides a `GET` API for users to retrieve their balance and Ethereum price.

## Components

- `app.js`: Main entry point of the application.
- `controllers`: Contains controllers for Ethereum price and transaction functionalities.
- `db.js`: Database configuration file.
- `middleware.js`: Middleware functions.
- `models`: Contains MongoDB models for Ethereum price and transactions.
- `package.json` and `package-lock.json`: Node.js package configuration files.
- `routes`: Contains route handlers for transaction and user functionalities.
- `schedule.js`: Script to schedule tasks for fetching Ethereum price periodically.
## How to Run

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
    ```
    npm start
    ```
## API Documentation

API documentation can be found [here](https://documenter.getpostman.com/view/24962949/2sA3JGf3iX).

