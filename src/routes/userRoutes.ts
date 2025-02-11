import express, { Router } from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/userController';

const router: Router = express.Router();

router.post('/users', createUser); 
router.get('/users', getUsers);

//EXTRA

router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

export default router;