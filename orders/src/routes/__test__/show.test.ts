import { Ticket } from "../../models/ticket";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("should fetch the order", async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Concert",
    price: 20,
  });
  await ticket.save();

  const user = global.signup();

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("should return an error if one user tries to fetch another users order", async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Concert",
    price: 20,
  });
  await ticket.save();

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signup())
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signup())
    .send()
    .expect(401);
});
