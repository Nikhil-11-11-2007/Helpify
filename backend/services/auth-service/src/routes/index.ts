import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import * as userController from '../controllers/user.controller';

const router = Router();

// Auth routes (no authentication needed - these are how you GET authenticated)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

// Protected routes (require valid JWT - gateway handles this)
router.post('/logout', authController.logout);
router.get('/me', userController.me);
router.get('/users', userController.list);

export default router;
