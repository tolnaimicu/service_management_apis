import fs from 'fs';
import path from 'path';
import { User } from '../models/userModel';


const filePath = path.join(__dirname, '../../users.json');



export const readUsersFromFile = (): User[] => {

    try{
        if (!fs.existsSync(filePath)) {
            return[]
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data) as User[];
    } catch (error){
        console.error('Error reading users file: ', error);
        return [];
    }
};



export const writeUsersToFile = (users: User[]): void => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing users file:', error);
    }
};