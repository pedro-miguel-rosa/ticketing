import { Publisher, Subjects, TicketCreatedEvent } from "@pmrtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
