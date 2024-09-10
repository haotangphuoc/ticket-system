# Ticket Management System

This app is currently deployed on: https://ticket-system.fly.dev

## Description

The Ticket Management System is a robust and efficient solution designed to automate and streamline the process of tracking and managing support requests. Built using TypeScript and the MERN stack (MongoDB, Express.js, React, Node.js), this system leverages JSON Web Tokens (JWT) for secure authorization and features distinct interfaces for Clients and Administrators.

### Key Features

- **Administrator Dashboard**:
  - View and manage incoming tickets.
  - Create new users and assign roles.
  - Generate tickets on behalf of other administrators.
  
- **Client Interface**:
  - View the tickets that the user has created.
  
- **User Registration**:
  - Accounts are created only if the user's email is present in the organization's database, ensuring that registration is restricted to authorized individuals.

### Technical Details

- **Frontend**: React for dynamic and responsive user interfaces.
- **Backend**: Node.js and Express.js for efficient server-side processing.
- **Database**: MongoDB for storing and managing ticket data.
- **Authentication**: JSON Web Tokens (JWT) for secure user authentication and authorization.


