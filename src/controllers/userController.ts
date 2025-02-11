import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { readUsersFromFile, writeUsersToFile } from '../utils/fileHandler';

// POST /users - Add a new user
export const createUser = (req: Request, res: Response): void => {
    const { username } = req.body;

    if (!username || typeof username !== 'string') {
        res.status(400).json({ error: 'Username is required and must be a string' });
        return;
    }

    const users = readUsersFromFile();
    const newId = users.length > 0 ? (parseInt(users[users.length - 1].id) + 1).toString() : '1';

    const newUser: User = {
        id: newId,
        username,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsersToFile(users);

    res.status(201).json({ message: 'User created successfully', user: newUser });
};

// GET /users - Retrieve all users
export const getUsers = (req: Request, res: Response) => {
    const users = readUsersFromFile();
    res.status(200).json(users);
};
