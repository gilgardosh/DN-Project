import express, { Router } from 'express';
import { stocksListController } from '../controllers/stocks-list.controller';

const router: Router = express.Router();

router.get('/', stocksListController);

export default router;
