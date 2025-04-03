const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);

describe('User Login', () => {
  it('should fail login with invalid credentials', async () => {
    const res = await request(app).post('/api/user/login').send({ email: 'nonexistent@mail.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Invalid Email or Password/i);
  });
});
