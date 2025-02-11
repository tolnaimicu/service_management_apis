import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);



describe('User API', () => {
    it('should create a user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ username: 'TestUser' });

        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty('id');
    });
});
