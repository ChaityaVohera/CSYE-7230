const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
app.get('/', (req, res) => res.send("OK"));

describe('Invalid Route', () => {
  it('should return 404 for invalid route', async () => {
    const res = await request(app).get('/nonexistent/route');
    expect(res.statusCode).toBe(404);
  });
});
