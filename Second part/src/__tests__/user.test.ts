import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../index';
import { UserModel } from '../models/user.model';

describe('User API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/jsonplaceholder_test');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const userData = {
        userId: 1,
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        address: {
          street: 'Test Street',
          suite: 'Test Suite',
          city: 'Test City',
          zipcode: '12345',
          geo: {
            lat: '0',
            lng: '0'
          }
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: {
          name: 'Test Company',
          catchPhrase: 'Test Phrase',
          bs: 'Test BS'
        }
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty('userId');
      expect(response.body.token).toBeDefined();
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await UserModel.create({
        userId: 1,
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        address: {
          street: 'Test Street',
          suite: 'Test Suite',
          city: 'Test City',
          zipcode: '12345',
          geo: {
            lat: '0',
            lng: '0'
          }
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: {
          name: 'Test Company',
          catchPhrase: 'Test Phrase',
          bs: 'Test BS'
        }
      });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it('should not login with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
    });
  });
}); 