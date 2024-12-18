import { Ticket } from "../../models/ticket";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { OrderStatus } from "@pmrtickets/common";
import { natsWrapper } from "../../nats-wrapper";
import mongoose from "mongoose";

it("should mark an order as cancelled", async () => {
  // Create a ticket with Ticket model
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Concert",
    price: 20,
  });
  await ticket.save();

  const user = global.signup();

  // Make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  // Expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("should emit an order cancelled event", async () => {
  // Create a ticket with Ticket model
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Concert",
    price: 20,
  });
  await ticket.save();

  const user = global.signup();

  // Make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
