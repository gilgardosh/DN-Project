import express, { Router } from 'express';
import { loginController } from '../controllers/login.controller';

const router: Router = express.Router();

router.post('/', loginController);

export default router;
