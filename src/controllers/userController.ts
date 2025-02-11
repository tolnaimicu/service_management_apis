import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { readUsersFromFile, writeUsersToFile } from '../utils/fileHandler';




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




export const getUsers = (req: Request, res: Response) => {
    const users = readUsersFromFile();
    res.status(200).json(users);
};




export const deleteUser = (req: Request, res: Response): void => {
    const { id } = req.params;

    let users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        res.status(404).json({ error: "User not found" });
        return; 
    }

    users.splice(userIndex, 1); 
    writeUsersToFile(users);

     res.status(200).json({ message: "User deleted successfully" });
};




export const updateUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { username } = req.body;

    if (!username || typeof username !== 'string') {
         res.status(400).json({ error: "Username is required and must be a string" });
    }

    let users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
         res.status(404).json({ error: "User not found" });
    }

    users[userIndex].username = username;
    writeUsersToFile(users);

     res.status(200).json({ message: "User updated successfully", user: users[userIndex] });
};

