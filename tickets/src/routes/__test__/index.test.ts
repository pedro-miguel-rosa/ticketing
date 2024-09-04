import request from "supertest";
import { app } from "../../app";

const createTicket = (title: string, price: number) => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title, price });
};

it("should fetch a list of tickets", async () => {
  await createTicket("Concert", 20);
  await createTicket("Soccer", 15);
  await createTicket("Disco", 10);

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
