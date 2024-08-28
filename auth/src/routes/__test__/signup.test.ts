import request from "supertest";
import { app } from "../../app";

it("should return a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "user@email.com",
      password: "1234",
    })
    .expect(201);
});

it("should return a 400 with a invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "user.email.com",
      password: "1234",
    })
    .expect(400);
});

it("should return a 400 with a invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "user@email.com",
      password: "123",
    })
    .expect(400);
});

it("should return a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@email.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "1234",
    })
    .expect(400);
});

it("should disallow duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@email.com",
      password: "1234",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@email.com",
      password: "1234",
    })
    .expect(400);
});

it("should set a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@email.com",
      password: "1234",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
