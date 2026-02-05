# Backend Developer Assignment

## Tech Stack
Node.js, Express, MongoDB Atlas, JWT, React

## Features
- Secure authentication with JWT
- Role-based access (admin/user)
- CRUD APIs for tasks
- Protected routes
- Swagger API documentation
- Basic frontend for testing

## Setup

### Clone
- git clone https://github.com/R-i-s-hi/assigment.git

### Backend
- cd backend
- npm install
- npm run dev

### Frontend
- cd frontend
- npm install
- npm run dev

## API Docs
http://localhost:5000/api-docs

## Test Credentials

### Admin User
- Email: rishabh@gmail.com  
- Password: 123456  
(Admin can manage all tasks)

### Normal User
You can register a new user from the frontend to test normal access.

## Scalability Notes
The backend uses modular architecture and stateless JWT authentication, enabling horizontal scaling.

Future improvements:
- Redis caching
- Microservices architecture
- Docker deployment
- Load balancing
