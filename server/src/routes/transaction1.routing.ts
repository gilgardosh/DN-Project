import express, { Router } from 'express';
import { transactionTradesController } from '../controllers/transaction1.controller';

const router: Router = express.Router();
router.put('/', transactionTradesController);

export default router;
