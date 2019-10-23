import express, { Router } from 'express';
import { transactionController } from '../controllers/transaction.controller';

const router: Router = express.Router();
router.put('/', transactionController);

export default router;
