import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  public readonly statusCode = 500;
  private reason = "Error connecting to database";

  constructor() {
    super("Error connecting to db");
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
