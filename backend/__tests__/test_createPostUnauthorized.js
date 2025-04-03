const request = require('supertest');
const express = require('express');
const postRoutes = require('../routes/postRoute');
const app = express();

app.use(express.json());
app.use('/posts', postRoutes);

describe('Create Post Unauthorized', () => {
  it('should fail to create post without token', async () => {
    const res = await request(app).post('/posts/create').send({ title: 'Test Post', content: 'Unauthorized test' });
    expect(res.statusCode).toBe(401);
  });
});
