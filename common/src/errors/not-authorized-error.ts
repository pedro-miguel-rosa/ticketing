import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  readonly statusCode = 401;

  constructor() {
    super("Not authorized");
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
