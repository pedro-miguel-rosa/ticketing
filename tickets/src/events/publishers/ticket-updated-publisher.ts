import { Publisher, Subjects, TicketUpdatedEvent } from "@pmrtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
