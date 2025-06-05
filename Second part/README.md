Run the full stack application with `docker compose up` (includes both API and frontend) or run just the API with `docker compose up app` or run tests with `docker compose run test`. The frontend will be available at http://localhost:3001 and the API at http://localhost:3000.

# JSONPlaceholder Clone API with Frontend

A full-stack application that includes a RESTful API replicating JSONPlaceholder with additional features, and a modern React frontend for user management.

## Features

- Full CRUD operations for users
- JWT-based authentication
- MongoDB database integration
- Docker containerization
- TypeScript implementation
- Input validation
- Error handling
- API documentation
- Modern React frontend with:
  - Responsive design
  - User authentication
  - Interactive user management
  - Real-time updates
  - Modal views for user details
  - Clean and intuitive UI

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- MongoDB (if running locally)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd jsonplaceholder-clone
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/jsonplaceholder
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Running the Application

### Using Docker (Recommended)

```bash
# Run the entire stack (API + Frontend + MongoDB)
docker compose up --build

# Access the applications:
# Frontend: http://localhost:3001
# API: http://localhost:3000
```

### Local Development

1. Start MongoDB (if running locally)
2. Run the backend development server:
```bash
npm run dev
```

3. Run the frontend development server:
```bash
cd frontend
npm start
```

4. Seed the database (optional):
```bash
npm run seed
```

## Frontend Features

- User authentication (login/logout)
- User list with detailed information
- Interactive user management
- Responsive design for all screen sizes
- Real-time updates
- Modal views for user details
- Clean and intuitive UI with Tailwind CSS
- Smooth animations with Framer Motion

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get JWT token

### Users

- `GET /api/users` - Get all users (requires authentication)
- `GET /api/users/:id` - Get user by ID (requires authentication)
- `PUT /api/users/:id` - Update user (requires authentication)
- `DELETE /api/users/:id` - Delete user (requires authentication)

## Testing

Run the test suite:
```bash
npm test
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run seed` - Seed the database with initial data

## License

MIT 