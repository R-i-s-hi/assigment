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

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## API Docs
http://localhost:5000/api-docs

## Scalability Notes
The backend uses modular architecture and stateless JWT authentication, enabling horizontal scaling.

Future improvements:
- Redis caching
- Microservices architecture
- Docker deployment
- Load balancing