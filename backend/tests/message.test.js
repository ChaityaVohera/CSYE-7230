const request = require("supertest");
const app = require("../server");

const AUTH_TOKEN = "<token>"; // Replace with actual token
const CHAT_ID = "someChatId"; // Replace with valid chat ID

describe("Message API", () => {
  it("should send a message", async () => {
    const res = await request(app)
      .post("/api/message")
      .set("Authorization", `Bearer ${AUTH_TOKEN}`)
      .send({
        content: "Hello world",
        chatId: CHAT_ID,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("content", "Hello world");
  });

  it("should fetch all messages in a chat", async () => {
    const res = await request(app)
      .get(`/api/message/${CHAT_ID}`)
      .set("Authorization", `Bearer ${AUTH_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
