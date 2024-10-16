export abstract class CustomError extends Error {
  public abstract readonly statusCode: number;

  protected constructor(message: string) {
    super(message);
  }

  public abstract serializeErrors(): { message: string; field?: string }[];
}
