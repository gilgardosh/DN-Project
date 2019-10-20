import express, { Router } from 'express';
import { userTradeHistoryController } from '../controllers/user-trades.controller';

const router: Router = express.Router();

router.post('/', userTradeHistoryController);

export default router;
