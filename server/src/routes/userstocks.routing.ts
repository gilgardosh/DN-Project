import express, { Router } from 'express';
import { userStocksController } from '../controllers/user-stocks.controller';

const router: Router = express.Router();

router.post('/', userStocksController);

export default router;
