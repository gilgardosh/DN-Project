import express, { Router } from 'express';
import { initUserController } from '../controllers/inituser.controller';

const router: Router = express.Router();
router.post('/', initUserController);

export default router;
