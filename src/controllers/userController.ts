import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { readUsersFromFile, writeUsersToFile } from '../utils/fileHandler';




export const createUser = (req: Request, res: Response): void => {
    const { username } = req.body;

    if (!username || typeof username !== 'string') {
        res.status(400).json({ error: 'Username is required and must be entered in a string format' });
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
        res.status(404).json({ error: "No user by this ID" });
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
         res.status(400).json({ error: "Username is required and must be entered in a string format" });
    }

    let users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
         res.status(404).json({ error: "No user by this ID" });
    }

    users[userIndex].username = username;
    writeUsersToFile(users);

     res.status(200).json({ message: "User updated successfully", user: users[userIndex] });
};


export const getUserById = (req: Request, res: Response): void => {
    const { id } = req.params; 
    const users = readUsersFromFile(); 

    const user = users.find(user => user.id === id); 

    if (!user) {
         res.status(404).json({ error: "User not found" });
         return;
    }

     res.status(200).json(user);
};


