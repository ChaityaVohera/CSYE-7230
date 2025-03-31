const request = require("supertest");
const app = require("../server");

const AUTH_TOKEN = "<token>"; // Replace with actual token
const USER_ID = "someUserId"; // Replace with a valid user ID

describe("Chat API", () => {
  it("should create or fetch one-on-one chat", async () => {
    const res = await request(app)
      .post("/api/chat")
      .set("Authorization", `Bearer ${AUTH_TOKEN}`)
      .send({ userId: USER_ID });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
  });

  it("should get all chats for user", async () => {
    const res = await request(app)
      .get("/api/chat")
      .set("Authorization", `Bearer ${AUTH_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
