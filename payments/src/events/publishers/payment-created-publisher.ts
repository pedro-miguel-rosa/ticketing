import { PaymentCreatedEvent, Publisher, Subjects } from "@pmrtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
