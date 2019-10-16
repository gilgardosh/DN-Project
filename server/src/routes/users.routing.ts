import express, { Router } from 'express';
import { userDataController } from '../controllers/user-data.controller';

const router: Router = express.Router();

router.get('/:userId', userDataController);

export default router;
