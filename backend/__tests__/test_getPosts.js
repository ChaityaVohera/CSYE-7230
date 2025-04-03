const request = require('supertest');
const express = require('express');
const postRoutes = require('../routes/postRoute');
const app = express();

app.use(express.json());
app.use('/posts', postRoutes);

describe('Get Posts', () => {
  it('should retrieve posts (expected 200)', async () => {
    const res = await request(app).get('/posts/getPosts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
