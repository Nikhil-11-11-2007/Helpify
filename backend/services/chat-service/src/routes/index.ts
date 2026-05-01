import { Router } from 'express';
import * as historyController from '../controllers/history.controller';

const router = Router();
router.get('/history', historyController.getHistory);
export default router;
