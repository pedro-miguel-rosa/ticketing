import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("should return a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signup())
    .send({ title: "Concert", price: 20 })
    .expect(404);
});

it("should return a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "Concert", price: 20 })
    .expect(401);
});

it("should return a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title: "Concert", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signup())
    .send({ title: "soccer", price: 15 })
    .expect(401);
});

it("should return a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signup();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Concert", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 15 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "Concert", price: -15 })
    .expect(400);
});

it("should update the ticket provided valid inputs", async () => {
  const cookie = global.signup();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Concert", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "Soccer", price: 15 })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual("Soccer");
  expect(ticketResponse.body.price).toEqual(15);
});
