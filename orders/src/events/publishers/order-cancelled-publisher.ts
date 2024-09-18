import { OrderCancelledEvent, Publisher, Subjects } from "@pmrtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
