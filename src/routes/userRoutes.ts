import express, { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

const router: Router = express.Router();

router.post('/users', createUser); // Ensure function is correctly typed
router.get('/users', getUsers);

export default router;