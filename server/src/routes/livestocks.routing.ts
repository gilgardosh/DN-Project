import express, { Router } from 'express';
import { liveStocksController } from '../controllers/live-stocks.controller';

const router: Router = express.Router();

router.get('', liveStocksController);

export default router;
