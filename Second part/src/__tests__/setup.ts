import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/jsonplaceholder_test';
process.env.JWT_SECRET = 'test_jwt_secret';

// Increase test timeout for MongoDB connection
jest.setTimeout(30000); 