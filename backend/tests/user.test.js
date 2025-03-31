const request = require("supertest");
const app = require("../server"); // Adjust path if needed

describe("User API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/user").send({
      name: "Test User",
      email: "testuser@neu.edu",
      password: "123456",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should log in a user", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "testuser@neu.edu",
      password: "123456",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
