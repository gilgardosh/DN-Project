import express, { Router } from 'express';
import { signupController } from '../controllers/signup.controller';

const router: Router = express.Router();
router.post('/', signupController);

export default router;
