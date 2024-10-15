export enum OrderStatus {
  Created = "created", // When the order has been created, but the ticket it is trying to order has not been reserved
  Cancelled = "cancelled", // The ticket the order is trying to reserve has already been reserved, when the user has cancelled the order or when the order expires before payment
  AwaitingPayment = "awaiting:payment", // The order has successfully reserved the ticket
  Complete = "complete", // The order has reserved the ticker and the user has provided payment successfully
}
