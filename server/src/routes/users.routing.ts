import express, { Router } from 'express';
import { userDataController } from '../controllers/user-data.controller';

const router: Router = express.Router();

router.post('/', userDataController);

export default router;
