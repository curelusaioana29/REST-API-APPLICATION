import request from "supertest";
import app from "../app.mjs";
import User from "../models/user.mjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

describe("POST /api/users/login", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should login user and return token and user object", async () => {
    const email = "test@example.com";
    const password = "password123";
    const user = new User({ email, password });

    await user.save();

    const response = await request(app)
      .post("/api/users/login")
      .send({ email, password })
      .expect(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(email);
    expect(response.body.user.subscription).toBe("starter");
  });

  it("should return 401 for invalid credentials", async () => {
    const email = "invalid@example.com";
    const password = "invalidpassword";
    const response = await request(app)
      .post("/api/users/login")
      .send({ email, password })
      .expect(401);

    expect(response.body.message).toBe("Email or password is wrong");
  });
});
