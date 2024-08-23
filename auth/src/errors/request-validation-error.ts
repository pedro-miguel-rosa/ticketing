import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  public readonly statusCode = 400;

  constructor(private readonly errors: ValidationError[]) {
    super("Invalid request parameters");
  }

  serializeErrors() {
    return this.errors.map((error) => {
      if (error.type === "field") {
        return { message: error.msg, field: error.path };
      }
      return { message: error.msg };
    });
  }
}
