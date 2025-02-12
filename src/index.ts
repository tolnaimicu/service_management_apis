import express from 'express';
import userRoutes from './routes/userRoutes';
import path from 'path';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  

app.use(express.static(path.join(__dirname, "../src_frontend")));

app.use('/api', userRoutes);



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
