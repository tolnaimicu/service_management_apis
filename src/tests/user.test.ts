import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);



describe('User API', () => {

    let userId: string;
    const newUsername = 'UpdatedUsername';


    it('should create a user', async () => {

        const response = await request(app)
            .post('/api/users')
            .send({ username: 'TestUser' });

        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user.username).toBe("TestUser");

        userId = response.body.user.id;
    });

    
    it('should return all the users', async () => {
        
        const response = await request(app).get('/api/users');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

      
    it("should update the username", async () => {

        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send({ username: newUsername})
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User updated successfully");
    });  


    it("should return a user by ID", async () => {

        const response = await request(app).get(`/api/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.username).toBe("UpdatedUsername");
    });

    it("should return 404 when user not exists", async () => {

        const response = await request(app).get(`/api/users/99999`);
    
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("User not found");
        });

    

    it("should delete the newly created user", async () => {
        const response = await request(app).delete(`/api/users/${userId}`);

        expect(response.status).toBe(200);
    });


    it("should return 404 when deleting a non existing user", async () => {

        const response = await request(app).delete(`/api/users/99999`);

        expect(response.status).toBe(404);
    });
    


    
    
});
