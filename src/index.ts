import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // Middleware to parse JSON requests

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
