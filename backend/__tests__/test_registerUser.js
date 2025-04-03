const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);

describe('User Registration', () => {
  it('should fail registration with missing fields', async () => {
    const res = await request(app).post('/api/user').send({ email: 'test@example.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Please Enter all the Fields/i);
  });
});
