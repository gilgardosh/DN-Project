import express, { Router } from 'express';
import { transactionUserStocksController } from '../controllers/transaction2.controller';

const router: Router = express.Router();
router.put('/', transactionUserStocksController);

export default router;
