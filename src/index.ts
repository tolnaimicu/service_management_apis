import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // Middleware to parse JSON requests

app.use(express.static(path.join(__dirname, "../src_frontend")));

app.use('/api', userRoutes);

console.log("userRoutes: ", userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
