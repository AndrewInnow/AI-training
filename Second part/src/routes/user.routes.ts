import { Router } from 'express';
import {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router; 