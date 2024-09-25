import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@pmrtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
