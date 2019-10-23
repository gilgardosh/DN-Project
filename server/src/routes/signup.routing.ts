import express, { Router } from 'express';
import { signupController } from '../controllers/signup.controller';

const router: Router = express.Router();
router.put('/', signupController);

export default router;
